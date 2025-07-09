// Browser-compatible XSD validation for IDS files
export const validateIdsXml = async (
  xmlString: string,
  xsdString: string
): Promise<{ valid: boolean; errors?: string[] }> => {
  try {
    const parser = new DOMParser();
    
    // Parse both XML and XSD
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const xsdDoc = parser.parseFromString(xsdString, 'application/xml');
    
    // Check for XML parsing errors
    const xmlParseErrors = xmlDoc.getElementsByTagName('parsererror');
    if (xmlParseErrors.length > 0) {
      const errorText = xmlParseErrors[0].textContent || 'XML parsing error';
      return {
        valid: false,
        errors: [errorText]
      };
    }

    // Check for XSD parsing errors
    const xsdParseErrors = xsdDoc.getElementsByTagName('parsererror');
    if (xsdParseErrors.length > 0) {
      return {
        valid: false,
        errors: ['XSD schema parsing error']
      };
    }

    // Advanced XSD-based validation
    const errors: string[] = [];
    
    // Extract validation rules from XSD
    const xsdNamespace = 'http://standards.buildingsmart.org/IDS';
    
    // Check root element and namespace
    if (xmlDoc.documentElement.tagName !== 'ids:ids') {
      errors.push('Root element must be "ids:ids"');
    }
    
    const namespace = xmlDoc.documentElement.getAttribute('xmlns:ids');
    if (namespace !== xsdNamespace) {
      errors.push(`Missing or incorrect namespace declaration. Expected: "${xsdNamespace}"`);
    }
    
    // Validate against XSD schema structure
    const validationErrors = validateAgainstXSDStructure(xmlDoc, xsdDoc);
    errors.push(...validationErrors);

    if (errors.length > 0) {
      return {
        valid: false,
        errors
      };
    }

    return { valid: true };
    
  } catch (err: any) {
    return {
      valid: false,
      errors: [err?.message || String(err) || "Validation error"],
    };
  }
};

function validateAgainstXSDStructure(xmlDoc: Document, xsdDoc: Document): string[] {
  const errors: string[] = [];
  
  try {
    // Get XSD elements for validation rules
    const xsdElements = xsdDoc.getElementsByTagName('xs:element');
    const xsdComplexTypes = xsdDoc.getElementsByTagName('xs:complexType');
    
    // Validate info section
    const infoElements = xmlDoc.getElementsByTagName('ids:info');
    if (infoElements.length === 0) {
      errors.push('Missing required "ids:info" section');
    } else if (infoElements.length > 1) {
      errors.push('Multiple "ids:info" sections found, only one allowed');
    } else {
      errors.push(...validateInfoSection(infoElements[0]));
    }
    
    // Validate specifications section
    const specificationsElements = xmlDoc.getElementsByTagName('ids:specifications');
    if (specificationsElements.length === 0) {
      errors.push('Missing required "ids:specifications" section');
    } else if (specificationsElements.length > 1) {
      errors.push('Multiple "ids:specifications" sections found, only one allowed');
    } else {
      errors.push(...validateSpecificationsSection(specificationsElements[0]));
    }
    
  } catch (err: any) {
    errors.push(`XSD structure validation error: ${err.message || String(err)}`);
  }
  
  return errors;
}

function validateInfoSection(infoElement: Element): string[] {
  const errors: string[] = [];
  
  // Check required title element (from XSD: <xs:element name="title" type="xs:string"/>)
  const titleElements = infoElement.getElementsByTagName('ids:title');
  if (titleElements.length === 0) {
    errors.push('Missing required "ids:title" in info section');
  } else if (titleElements.length > 1) {
    errors.push('Multiple "ids:title" elements found, only one allowed');
  }
  
  // Validate author format if present (from XSD: pattern value="[^@]+@[^\.]+\..+")
  const authorElements = infoElement.getElementsByTagName('ids:author');
  if (authorElements.length > 1) {
    errors.push('Multiple "ids:author" elements found, only one allowed');
  } else if (authorElements.length === 1) {
    const authorText = authorElements[0].textContent || '';
    const emailPattern = /^[^@]+@[^\.]+\..+$/;
    if (authorText && !emailPattern.test(authorText)) {
      errors.push('Author must be a valid email address format (pattern: [^@]+@[^\\.]+\\..+)');
    }
  }
  
  // Validate date format if present (from XSD: type="xs:date")
  const dateElements = infoElement.getElementsByTagName('ids:date');
  if (dateElements.length > 1) {
    errors.push('Multiple "ids:date" elements found, only one allowed');
  } else if (dateElements.length === 1) {
    const dateText = dateElements[0].textContent || '';
    if (dateText) {
      // XSD date format: YYYY-MM-DD
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(dateText) || isNaN(Date.parse(dateText))) {
        errors.push('Date must be in valid xs:date format (YYYY-MM-DD)');
      }
    }
  }
  
  // Check for optional elements (from XSD schema)
  const optionalElements = ['ids:copyright', 'ids:version', 'ids:description', 'ids:purpose', 'ids:milestone'];
  for (const elementName of optionalElements) {
    const elements = infoElement.getElementsByTagName(elementName);
    if (elements.length > 1) {
      errors.push(`Multiple "${elementName}" elements found, only one allowed`);
    }
  }
  
  return errors;
}

function validateSpecificationsSection(specificationsElement: Element): string[] {
  const errors: string[] = [];
  
  // Check for at least one specification (from XSD: minOccurs="1")
  const specifications = specificationsElement.getElementsByTagName('ids:specification');
  if (specifications.length === 0) {
    errors.push('At least one "ids:specification" is required in specifications section');
  }
  
  // Validate each specification
  for (let i = 0; i < specifications.length; i++) {
    const spec = specifications[i];
    const specName = `Specification ${i + 1}`;
    
    errors.push(...validateSpecification(spec, specName));
  }
  
  return errors;
}

function validateSpecification(specElement: Element, specName: string): string[] {
  const errors: string[] = [];
  
  // Check required attributes (from XSD)
  if (!specElement.getAttribute('name')) {
    errors.push(`${specName}: Missing required "name" attribute`);
  }
  
  if (!specElement.getAttribute('ifcVersion')) {
    errors.push(`${specName}: Missing required "ifcVersion" attribute`);
  } else {
    // Validate ifcVersion values (from XSD enumeration)
    const ifcVersion = specElement.getAttribute('ifcVersion') || '';
    const validVersions = ['IFC2X3', 'IFC4', 'IFC4X3_ADD2'];
    const versions = ifcVersion.trim().split(/\s+/);
    for (const version of versions) {
      if (version && !validVersions.includes(version)) {
        errors.push(`${specName}: Invalid ifcVersion "${version}". Must be one of: ${validVersions.join(', ')}`);
      }
    }
  }
  
  // Check required applicability section (from XSD)
  const applicabilityElements = specElement.getElementsByTagName('ids:applicability');
  if (applicabilityElements.length === 0) {
    errors.push(`${specName}: Missing required "ids:applicability" section`);
  } else if (applicabilityElements.length > 1) {
    errors.push(`${specName}: Multiple "ids:applicability" sections found, only one allowed`);
  } else {
    errors.push(...validateApplicability(applicabilityElements[0], specName));
  }
  
  // Validate requirements section if present (optional from XSD: minOccurs="0")
  const requirementsElements = specElement.getElementsByTagName('ids:requirements');
  if (requirementsElements.length > 1) {
    errors.push(`${specName}: Multiple "ids:requirements" sections found, only one allowed`);
  } else if (requirementsElements.length === 1) {
    errors.push(...validateRequirements(requirementsElements[0], specName));
  }
  
  return errors;
}

function validateApplicability(applicabilityElement: Element, specName: string): string[] {
  const errors: string[] = [];
  
  // According to XSD applicabilityType, at least one constraint is needed
  const constraintTypes = ['ids:entity', 'ids:partOf', 'ids:classification', 'ids:attribute', 'ids:property', 'ids:material'];
  let hasConstraints = false;
  
  for (const constraintType of constraintTypes) {
    const elements = applicabilityElement.getElementsByTagName(constraintType);
    if (elements.length > 0) {
      hasConstraints = true;
      
      // Validate specific constraint types
      if (constraintType === 'ids:entity') {
        for (let i = 0; i < elements.length; i++) {
          errors.push(...validateEntity(elements[i], `${specName} applicability entity ${i + 1}`));
        }
      }
    }
  }
  
  if (!hasConstraints) {
    errors.push(`${specName}: Applicability must contain at least one constraint (entity, partOf, classification, attribute, property, or material)`);
  }
  
  return errors;
}

function validateRequirements(requirementsElement: Element, specName: string): string[] {
  const errors: string[] = [];
  
  // Validate requirement types according to XSD
  const requirementTypes = ['ids:entity', 'ids:partOf', 'ids:classification', 'ids:attribute', 'ids:property', 'ids:material'];
  
  for (const reqType of requirementTypes) {
    const reqElements = requirementsElement.getElementsByTagName(reqType);
    
    for (let i = 0; i < reqElements.length; i++) {
      const reqElement = reqElements[i];
      const reqName = `${specName} requirements ${reqType.replace('ids:', '')} ${i + 1}`;
      
      // Validate based on XSD requirements
      if (reqType === 'ids:classification') {
        errors.push(...validateClassificationRequirement(reqElement, reqName));
      } else if (reqType === 'ids:attribute') {
        errors.push(...validateAttributeRequirement(reqElement, reqName));
      } else if (reqType === 'ids:property') {
        errors.push(...validatePropertyRequirement(reqElement, reqName));
      } else if (reqType === 'ids:entity') {
        errors.push(...validateEntity(reqElement, reqName));
      }
    }
  }
  
  return errors;
}

function validateEntity(entityElement: Element, context: string): string[] {
  const errors: string[] = [];
  
  // From XSD entityType: <xs:element name="name" type="ids:idsValue"/>
  const nameElements = entityElement.getElementsByTagName('ids:name');
  if (nameElements.length === 0) {
    errors.push(`${context}: Missing required "name" element`);
  } else if (nameElements.length > 1) {
    errors.push(`${context}: Multiple "name" elements found, only one allowed`);
  } else {
    errors.push(...validateIdsValue(nameElements[0], `${context} name`));
  }
  
  // predefinedType is optional (minOccurs="0")
  const predefinedTypeElements = entityElement.getElementsByTagName('ids:predefinedType');
  if (predefinedTypeElements.length > 1) {
    errors.push(`${context}: Multiple "predefinedType" elements found, only one allowed`);
  } else if (predefinedTypeElements.length === 1) {
    errors.push(...validateIdsValue(predefinedTypeElements[0], `${context} predefinedType`));
  }
  
  return errors;
}

function validateIdsValue(idsValueElement: Element, context: string): string[] {
  const errors: string[] = [];
  
  // From XSD idsValue: choice between simpleValue and xs:restriction
  const simpleValueElements = idsValueElement.getElementsByTagName('ids:simpleValue');
  const restrictionElements = idsValueElement.getElementsByTagName('xs:restriction');
  
  if (simpleValueElements.length === 0 && restrictionElements.length === 0) {
    errors.push(`${context}: Must contain either "ids:simpleValue" or "xs:restriction"`);
  } else if (simpleValueElements.length > 1) {
    errors.push(`${context}: Multiple "ids:simpleValue" elements found, only one allowed`);
  } else if (restrictionElements.length > 1) {
    errors.push(`${context}: Multiple "xs:restriction" elements found, only one allowed`);
  }
  
  return errors;
}

function validateClassificationRequirement(classificationElement: Element, context: string): string[] {
  const errors: string[] = [];
  
  // From XSD classificationType: system is required (minOccurs="1")
  const systemElements = classificationElement.getElementsByTagName('ids:system');
  if (systemElements.length === 0) {
    errors.push(`${context}: Missing required "system" element`);
  } else if (systemElements.length > 1) {
    errors.push(`${context}: Multiple "system" elements found, only one allowed`);
  } else {
    errors.push(...validateIdsValue(systemElements[0], `${context} system`));
  }
  
  // value is optional (minOccurs="0")
  const valueElements = classificationElement.getElementsByTagName('ids:value');
  if (valueElements.length > 1) {
    errors.push(`${context}: Multiple "value" elements found, only one allowed`);
  } else if (valueElements.length === 1) {
    errors.push(...validateIdsValue(valueElements[0], `${context} value`));
  }
  
  return errors;
}

function validateAttributeRequirement(attributeElement: Element, context: string): string[] {
  const errors: string[] = [];
  
  // From XSD attributeType: name is required
  const nameElements = attributeElement.getElementsByTagName('ids:name');
  if (nameElements.length === 0) {
    errors.push(`${context}: Missing required "name" element`);
  } else if (nameElements.length > 1) {
    errors.push(`${context}: Multiple "name" elements found, only one allowed`);
  } else {
    errors.push(...validateIdsValue(nameElements[0], `${context} name`));
  }
  
  // value is optional (minOccurs="0")
  const valueElements = attributeElement.getElementsByTagName('ids:value');
  if (valueElements.length > 1) {
    errors.push(`${context}: Multiple "value" elements found, only one allowed`);
  } else if (valueElements.length === 1) {
    errors.push(...validateIdsValue(valueElements[0], `${context} value`));
  }
  
  return errors;
}

function validatePropertyRequirement(propertyElement: Element, context: string): string[] {
  const errors: string[] = [];
  
  // From XSD propertyType: propertySet and baseName are required
  const propertySetElements = propertyElement.getElementsByTagName('ids:propertySet');
  if (propertySetElements.length === 0) {
    errors.push(`${context}: Missing required "propertySet" element`);
  } else if (propertySetElements.length > 1) {
    errors.push(`${context}: Multiple "propertySet" elements found, only one allowed`);
  } else {
    errors.push(...validateIdsValue(propertySetElements[0], `${context} propertySet`));
  }
  
  const baseNameElements = propertyElement.getElementsByTagName('ids:baseName');
  if (baseNameElements.length === 0) {
    errors.push(`${context}: Missing required "baseName" element`);
  } else if (baseNameElements.length > 1) {
    errors.push(`${context}: Multiple "baseName" elements found, only one allowed`);
  } else {
    errors.push(...validateIdsValue(baseNameElements[0], `${context} baseName`));
  }
  
  // value is optional (minOccurs="0")
  const valueElements = propertyElement.getElementsByTagName('ids:value');
  if (valueElements.length > 1) {
    errors.push(`${context}: Multiple "value" elements found, only one allowed`);
  } else if (valueElements.length === 1) {
    errors.push(...validateIdsValue(valueElements[0], `${context} value`));
  }
  
  // Validate dataType attribute if present (must be upperCaseName pattern)
  const dataType = propertyElement.getAttribute('dataType');
  if (dataType) {
    const upperCasePattern = /^[A-Z]+$/;
    if (!upperCasePattern.test(dataType)) {
      errors.push(`${context}: dataType attribute must be uppercase letters only (pattern: [A-Z]+)`);
    }
  }
  
  return errors;
}
