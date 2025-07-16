import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
  Divider,
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { T } from "@tolgee/react";
import { usePropertyTreeQuery, useFindItemQuery, useFindPropertyGroupsQuery, CatalogRecordType } from "../generated/types";
import { useQuery, gql } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { IDS_IFC_ENTITIES } from "../components/idsEntities";
import { convertToIDSXml } from "../components/idsXmlConverter";
import { useSnackbar } from "notistack";
import { validateWithXSDLibrary } from "../components/idsValidatorBrowser";
import { useProfile } from "../providers/ProfileProvider";
import { SaveLoadDialog } from "../components/SaveLoadDialog";
import { autoSaveIDSData, getAutoSavedIDSData } from "../utils/idsStorage";

const GROUP_TAG_ID = "5997da9b-a716-45ae-84a9-e2a7d186bcf9";
const MODEL_TAG_ID = "6f96aaa7-e08f-49bb-ac63-93061d4c5db2";
// PropertyGroup-Tag-ID
const PROPERTY_GROUP_TAG_ID = "a27c8e3c-5fd1-47c9-806a-6ded070efae8";
const PROPERTY_GROUP_TAG_NAME = "Merkmalsgruppe";

// Direkte GraphQL Query für Debug
const FIND_NESTS_QUERY = gql`
  query FindNests($input: SearchInput!) {
    search(input: $input) {
      nodes {
        __typename
        id
        recordType
        name(input: { languageTags: ["de-DE", "en-US"] })
        description(input: { languageTags: ["de-DE", "en-US"] })
        comment(input: { languageTags: ["de-DE", "en-US"] })
        tags {
          id
          name
        }
      }
      pageInfo {
        totalPages
        pageNumber
        hasNext
        hasPrevious
      }
      totalElements
    }
  }
`;

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

export const IDSExportView: React.FC = () => {
  const { profile } = useProfile();

  // Typen für alle Requirement-Varianten
  type PropertyRequirement = {
    type: "property";
    propertySet?: string;
    baseNames?: string[]; // IDs der gewählten Merkmale
    valueMap?: Record<string, string[]>; // Merkmal-ID -> Value-IDs
    dataType?: string;
    uri?: string;
    cardinality?: string;
  };
  type Requirement =
    | {
        type: "classification";
        value: string; // ModelId
        modelName?: string;
        selectedClasses?: string[]; // Optional: IDs der gewählten Klassen
        classNames?: string[]; // Optional: Namen der gewählten Klassen für die XML-Ausgabe
        valueNames?: string[]; // Für die XML-Ausgabe
      }
    | {
        type: "attribute";
        value: string; // ModelId oder ClassId
        valueNames?: string; // Modellname oder Klassenname als Pattern
      }
    | PropertyRequirement;

  const [specRows, setSpecRows] = useState<
    {
      id: number;
      name: string;
      applicabilityType: "type" | "classification";
      ifcVersion: string;
      requirements: Requirement[];
      ifcClass?: string;
    }[]
  >([]);
  const [addRowMode, setAddRowMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [specName, setSpecName] = useState("");
  const [applicabilityType, setApplicabilityType] = useState<"type" | "classification">("type");
  const [ifcVersion, setIfcVersion] = useState("IFC4");
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [ifcClass, setIfcClass] = useState("");
  const [showIfcSuggestions, setShowIfcSuggestions] = useState(false);
  const [idsTitle, setIdsTitle] = useState("");
  const [isIdsGenerated, setIsIdsGenerated] = useState(false); 
  const [saveLoadDialogOpen, setSaveLoadDialogOpen] = useState(false);
  const [saveLoadMode, setSaveLoadMode] = useState<'ids' | 'specification'>('ids');
  const [hasShownAutoSaveNotification, setHasShownAutoSaveNotification] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // DataCat
  const { data, loading, error } = usePropertyTreeQuery({
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });

  // Query: Alle Nests, mit verbesserter Performance - DEBUG: Ohne tagged Filter und vereinfacht
  const {
    data: allItemsData,
    loading: allItemsLoading,
    error: allItemsError,
  } = useFindItemQuery({
    variables: {
      input: {
        entityTypeIn: [CatalogRecordType.Nest],
        pageSize: 50, // Noch kleiner für Debug
      },
    },
    fetchPolicy: "no-cache", // Cache komplett ausschalten für Debug
    errorPolicy: "all", // Alle Errors anzeigen
  });

  // Alternative direkte Query für Debug
  const {
    data: directQueryData,
    loading: directQueryLoading,
    error: directQueryError,
  } = useQuery(FIND_NESTS_QUERY, {
    variables: {
      input: {
        entityTypeIn: [CatalogRecordType.Nest],
        pageSize: 50,
      },
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  // Merkmalsgruppen extrahieren
  const propertyGroupOptions = useMemo(() => {
    // Verwende die direkte Query für den Test
    const dataToUse = directQueryData || allItemsData;
    const errorToUse = directQueryError || allItemsError;
    
    if (errorToUse || !dataToUse?.search?.nodes) {
      return [];
    }
    
    // Filtere nur nach Nest recordType
    const nests = dataToUse.search.nodes.filter((n: any) => n.recordType === "Nest");
    
    // Filtere nach Merkmalsgruppe
    const propertyGroups = nests.filter((n: any) => 
      Array.isArray(n.tags) && 
      n.tags.some((t: any) => 
        t.name === PROPERTY_GROUP_TAG_NAME || 
        t.id === PROPERTY_GROUP_TAG_ID
      )
    );
    
    return propertyGroups.map((n: any) => ({
      id: n.id,
      name: n.name ?? "",
      tags: n.tags,
    })).sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
  }, [allItemsData, allItemsLoading, allItemsError, directQueryData, directQueryLoading, directQueryError]);

  // Fachmodelle extrahieren - Performance optimiert
  const modelOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes) return [];
    return data.hierarchy.nodes
      .filter(
        (n: any) =>
          n.recordType === "Bag" &&
          Array.isArray(n.tags) &&
          n.tags.some((t: any) => t.id === MODEL_TAG_ID)
      )
      .map((n: any) => ({
        id: n.id,
        name: n.name,
      }))
      .sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
  }, [data?.hierarchy?.nodes]); // Nur bei Änderung der nodes, nicht bei paths

  // Alle Klassen aller Modelle (für Requirements) - Performance stark optimiert
  const allClassOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes || !data?.hierarchy?.paths) return [];
    
    const nodes = data.hierarchy.nodes;
    const paths = data.hierarchy.paths;
    
    // Maps für bessere Performance
    const nodeMap = new Map(nodes.map((n: any) => [n.id, n]));
    const result: {
      name: string;
      id: string;
      groupName?: string;
      modelName?: string;
      modelId?: string;
    }[] = [];
    const seen = new Set<string>();

    // Optimierter Pfad-Durchlauf
    for (const path of paths) {
      let modelName = "";
      let modelId = "";
      let groupName = "";
      let classNode: any = null;
      
      // Durchlaufe Pfad rückwärts für bessere Performance
      for (let i = path.length - 1; i >= 0; i--) {
        const node = nodeMap.get(path[i]);
        if (!node) continue;
        
        if (node.recordType === "Subject" && !classNode) {
          classNode = node;
        } else if (node.recordType === "Bag" && Array.isArray(node.tags)) {
          if (!groupName && node.tags.some((t: any) => t.id === GROUP_TAG_ID)) {
            groupName = node.name ?? "";
          }
          if (!modelId && node.tags.some((t: any) => t.id === MODEL_TAG_ID)) {
            modelName = node.name ?? "";
            modelId = node.id;
            break; // Modell gefunden, können aufhören
          }
        }
      }
      
      if (classNode?.name && modelId && !seen.has(classNode.id)) {
        result.push({
          name: classNode.name,
          id: classNode.id,
          groupName: groupName || undefined,
          modelName: modelName || undefined,
          modelId,
        });
        seen.add(classNode.id);
      }
    }
    
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [data?.hierarchy?.nodes, data?.hierarchy?.paths]);

  // IFC Vorschläge
  const ifcSuggestions = useMemo(() => {
    if (!ifcClass || ifcClass.length < 4) return [];
    const input = ifcClass.toUpperCase();
    return IDS_IFC_ENTITIES.filter((ent) => ent.startsWith(input)).slice(0, 20);
  }, [ifcClass]);

  useEffect(() => {
    if (ifcClass.length >= 4 && ifcSuggestions.length > 0) {
      setShowIfcSuggestions(true);
    } else {
      setShowIfcSuggestions(false);
    }
  }, [ifcClass, ifcSuggestions]);

  // Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only auto-save if there's meaningful content
      if (specRows.length > 0 || idsTitle.trim()) {
        autoSaveIDSData(idsTitle, specRows);
      }
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [idsTitle, specRows]);

  // Check for auto-saved data on component mount
  useEffect(() => {
    if (!hasShownAutoSaveNotification) {
      const autoSaved = getAutoSavedIDSData();
      if (autoSaved && (autoSaved.data.specRows.length > 0 || autoSaved.data.idsTitle.trim())) {
        enqueueSnackbar("Automatisch gespeicherte Daten gefunden. Über 'Speichern & Laden' können Sie diese wiederherstellen.", { 
          variant: "info",
          autoHideDuration: 8000, // Wird nach 8 Sekunden automatisch ausgeblendet
          action: (key) => (
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => {
                setSaveLoadMode('ids');
                setSaveLoadDialogOpen(true);
              }}
            >
              Öffnen
            </Button>
          )
        });
        setHasShownAutoSaveNotification(true);
      }
    }
  }, [enqueueSnackbar, hasShownAutoSaveNotification]);

  // Requirement hinzufügen
  const handleAddRequirement = () => {
    const newReq = applicabilityType === "classification"
      ? { type: "attribute" as const, value: "" }
      : { type: "property" as const, propertySet: "", baseNames: [], valueMap: {}, dataType: "", uri: "", cardinality: "required" };
    
    setRequirements((reqs) => [...reqs, newReq]);
  };

  // Hilfsfunktionen für PropertySet/Merkmal/Value - Performance optimiert
  const getPropertySetUri = useMemo(() => 
    (propertySetName: string) => {
      const propertyGroup = propertyGroupOptions.find((g: any) => g.name === propertySetName);
      if (!propertyGroup) return "";
      return `${window.location.origin}/property-group/${propertyGroup.id}`;
    }, [propertyGroupOptions]
  );

  const getPropertiesForPropertySet = useMemo(() => {
    // Erstelle eine Map für bessere Performance
    const propertyMap = new Map<string, any[]>();
    
    return (propertySetName: string) => {
      if (propertyMap.has(propertySetName)) {
        return propertyMap.get(propertySetName) || [];
      }
      
      const propertyGroup = propertyGroupOptions.find((g: any) => g.name === propertySetName);
      if (!propertyGroup || !data?.hierarchy?.nodes || !data?.hierarchy?.paths) {
        propertyMap.set(propertySetName, []);
        return [];
      }
      
      const collectedPropertyIds = data.hierarchy.paths
        .filter((path: string[]) => path.includes(propertyGroup.id))
        .map((path: string[]) => {
          const idx = path.indexOf(propertyGroup.id);
          return path[idx + 1];
        })
        .filter(Boolean);
      
      const result = data.hierarchy.nodes.filter(
        (node: any) => node.recordType === "Property" && collectedPropertyIds.includes(node.id)
      );
      
      propertyMap.set(propertySetName, result);
      return result;
    };
  }, [propertyGroupOptions, data?.hierarchy?.nodes, data?.hierarchy?.paths]);

  const getValuesForProperty = useMemo(() => {
    // Erstelle eine Map für bessere Performance
    const valueMap = new Map<string, any[]>();
    
    return (propertyId: string) => {
      if (valueMap.has(propertyId)) {
        return valueMap.get(propertyId) || [];
      }
      
      if (!data?.hierarchy?.nodes) {
        valueMap.set(propertyId, []);
        return [];
      }
      
      const result = data.hierarchy.nodes.filter(
        (node: any) =>
          node.recordType === "Value" &&
          Array.isArray(node.tags) &&
          node.tags.some((tag: any) => tag.id === propertyId)
      );
      
      valueMap.set(propertyId, result);
      return result;
    };
  }, [data?.hierarchy?.nodes]);

  // Shortlist für dataType
  const DATA_TYPE_OPTIONS = [
    "IFCBOOLEAN",
    "IFCINTEGER",
    "IFCNUMBER",
    "IFCLABEL",
    "IFCTEXT",
    "IFCDATE",
    "IFCTIME",
    "IFCDATETIME",
    "IFCIDENTIFIER",
    "IFCREAL",
    "IFCPOSITIVELENGTHMEASURE",
    "IFCLENGTHMEASURE",
    "IFCAREAMEASURE",
    "IFCVOLUMEMEASURE",
    "IFCPLANEANGLEMEASURE",
  ];

  // Requirement ändern
  const handleRequirementChange = (
    idx: number,
    value: any,
    modelId?: string
  ) => {
    setRequirements((reqs: any) =>
      reqs.map((r: any, i: number) => {
        if (i !== idx) return r;
        if (r.type === "property") {
          // propertySet geändert: reset baseNames und valueMap
          if (value.propertySet && value.propertySet !== r.propertySet) {
            return {
              ...r,
              ...value,
              baseNames: [],
              valueMap: {},
              uri: getPropertySetUri(value.propertySet),
              dataType: "", // zurücksetzen
            };
          }
          // baseNames geändert: reset valueMap für nicht mehr gewählte baseNames
          if (value.baseNames) {
            const newValueMap: Record<string, string[]> = {};
            (value.baseNames as string[]).forEach((baseId: string) => {
              newValueMap[baseId] = (r as PropertyRequirement).valueMap?.[baseId] || [];
            });
            return {
              ...r,
              ...value,
              valueMap: newValueMap,
            };
          }
          // valueMap geändert (Werte für ein Merkmal)
          if (value.valueMap) {
            return {
              ...r,
              valueMap: value.valueMap,
            };
          }
          // dataType explizit geändert
          if (typeof value.dataType === "string") {
            return {
              ...r,
              dataType: value.dataType,
            };
          }
          return { ...r, ...value };
        }
        // Für classification/attribute
        if (r.type === "classification") {
          // Bei Classification: Wenn value (Modell) geändert wird, selectedClasses zurücksetzen
          if (typeof value === "string" && value !== r.value) {
            return {
              ...r,
              value,
              selectedClasses: [],
              classNames: [],
            };
          }
          // Wenn selectedClasses geändert wird
          if (value.selectedClasses) {
            const classNames = value.selectedClasses.map((classId: string) => getClassNameById(classId));
            return {
              ...r,
              selectedClasses: value.selectedClasses,
              classNames,
            };
          }
          return { ...r, value };
        }
        return {
          ...r,
          value,
        };
      })
    );
  };

  // Requirement-Typ ändern
  const handleRequirementTypeChange = (
    idx: number,
    type: "classification" | "attribute" | "property"
  ) => {
    setRequirements((reqs: any) => {
      const newReqs = reqs.map((r: any, i: number) => {
        if (i !== idx) return r;
        if (type === "property") {
          return {
            type: "property",
            propertySet: "",
            baseNames: [],
            valueMap: {},
            dataType: "",
            uri: "",
            cardinality: "required",
          };
        } else if (type === "classification") {
          return {
            type: "classification",
            value: "",
            selectedClasses: [],
            classNames: [],
          };
        } else {
          return {
            type,
            value: "",
          };
        }
      });
      return newReqs;
    });
  };

  // Requirement entfernen
  const handleRemoveRequirement = (idx: number) => {
    setRequirements((reqs: any) => reqs.filter((_: any, i: number) => i !== idx));
  };

  // Specification für Bearbeitung laden
  const handleEditSpec = (id: number) => {
    const spec = specRows.find(row => row.id === id);
    if (!spec) return;
    
    setEditingRowId(id);
    setSpecName(spec.name);
    setApplicabilityType(spec.applicabilityType);
    setIfcVersion(spec.ifcVersion);
    setIfcClass(spec.ifcClass || "");
    
    // Requirements zurück-konvertieren für die Bearbeitung
    const convertedRequirements = spec.requirements.map((req: any) => {
      if (req.type === "property") {
        // Property-Requirements zurück in das bearbeitbare Format konvertieren
        return {
          type: "property",
          propertySet: req.propertySet,
          baseNames: req.baseNames || [],
          valueMap: req.valueMap || {},
          dataType: req.dataType,
          uri: req.uri,
          cardinality: req.cardinality,
        };
      }
      return req;
    });
    
    setRequirements(convertedRequirements);
    setAddRowMode(true);
    setIsIdsGenerated(false);
  };

  // Hilfsfunktionen für Namensauflösung
  const getModelNameById = (id: string) =>
    modelOptions.find((m: any) => m.id === id)?.name || id;
  const getClassNameById = (id: string) =>
    allClassOptions.find((c: any) => c.id === id)?.name || id;

  // Klassen für ein bestimmtes Modell filtern
  const getClassesForModel = useMemo(() => 
    (modelId: string) => {
      return allClassOptions.filter((c: any) => c.modelId === modelId);
    }, [allClassOptions]
  );

  // Save/Load functionality
  const handleLoadIDS = (loadedIDSTitle: string, loadedSpecRows: any[]) => {
    setIdsTitle(loadedIDSTitle);
    setSpecRows(loadedSpecRows);
    setIsIdsGenerated(false);
    setHasShownAutoSaveNotification(true); // Reset notification flag when data is loaded
    enqueueSnackbar("IDS Daten wurden erfolgreich geladen.", { variant: "success" });
  };

  const handleLoadSpecification = (loadedSpec: any) => {
    // Close any open add/edit mode first
    setAddRowMode(false);
    setEditingRowId(null);
    
    // Load the specification data
    setSpecName(loadedSpec.name);
    setApplicabilityType(loadedSpec.applicabilityType);
    setIfcVersion(loadedSpec.ifcVersion);
    setIfcClass(loadedSpec.ifcClass || "");
    setRequirements(loadedSpec.requirements || []);
    
    // Open add mode to show the loaded specification
    setAddRowMode(true);
    enqueueSnackbar("Spezifikation wurde erfolgreich geladen.", { variant: "success" });
  };

  const getCurrentSpecificationData = () => {
    if (!addRowMode && !editingRowId) return null;
    
    return {
      name: specName,
      applicabilityType,
      ifcVersion,
      requirements,
      ifcClass
    };
  };

  // IDS Datei erzeugen
  const handleGenerateIds = () => {
    if (specRows.length === 0) {
      enqueueSnackbar("Bitte fügen Sie mindestens eine Specification hinzu.", { variant: "warning" });
      return;
    }
    setIsIdsGenerated(true);
    enqueueSnackbar("IDS Datei wurde erfolgreich erzeugt und kann jetzt heruntergeladen werden.", { variant: "success" });
  };

  // IDS Datei herunterladen
  const handleDownloadIds = async () => {
    if (!profile?.email) {
      enqueueSnackbar("Bitte melden Sie sich an, um eine IDS-Datei zu erstellen.", { variant: "warning" });
      return;
    }
    if (!isIdsGenerated) {
      enqueueSnackbar("Bitte erzeugen Sie zuerst die IDS-Datei.", { variant: "warning" });
      return;
    }
    const info = {
      title: idsTitle || "Meine IDS Datei",
      author: profile.email,
      version: "1.0",
      date: new Date().toISOString().split("T")[0],
    };
    const convertedSpecs = specRows.map((spec: any) => ({
      ...spec,
      applicabilityType: "type" as const,
      ifcClass: spec.applicabilityType === "classification" ? "IFCCLASSIFICATION" : spec.ifcClass
    }));
    const xml = convertToIDSXml(convertedSpecs, info);

    try {
      const xsd = await fetchXsd();
      const result = await validateWithXSDLibrary(xml, xsd);

      if (!result.valid) {
        enqueueSnackbar("IDS-Datei ist **nicht gültig**:\n" + result.errors?.join("\n"), { variant: "error" });
        return;
      }

      const blob = new Blob([xml], { type: "application/xml" });
      const url = window.URL.createObjectURL(blob);

      // Dateiname basierend auf IDS Name
      let filename = idsTitle.trim();
      if (!filename) {
        filename = "Meine IDS Datei"; // Fallback wenn kein IDS Name eingegeben
      }
      // Ungültige Zeichen für Dateinamen entfernen
      filename = filename.replace(/[^a-zA-Z0-9_\-äöüÄÖÜß ]+/g, ""); 
      filename = filename.replace(/\s+/g, "_");
      if (!filename) filename = "IDS_Datei"; // Sicherheits-Fallback
      filename += ".ids";

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      enqueueSnackbar("IDS Datei wurde erfolgreich heruntergeladen.", { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar("Fehler beim Validieren oder Herunterladen: " + (e?.message || e), {
        variant: "error",
      });
    }
  };

  const fetchXsd = async (): Promise<string> => {
    const res = await fetch("/ids.xsd");
    if (!res.ok) throw new Error("Konnte ids.xsd nicht laden");
    return await res.text();
  };

  // handleSaveSpec: Property-Requirements als Enumeration für mehrere Merkmale
  const handleSaveSpec = () => {
    const enrichedRequirements: Requirement[] = [];
    requirements.forEach((req) => {
      if (
        req.type === "property" &&
        req.propertySet &&
        Array.isArray(req.baseNames) &&
        req.baseNames.length > 0
      ) {
        // propertySet und baseNames sind garantiert gesetzt
        const propertySetName = req.propertySet!;
        const propertyList = getPropertiesForPropertySet(propertySetName);
        
        // Alle Merkmale als Enumeration in einem einzigen Property-Requirement
        const baseNamesList = req.baseNames.map((baseId: string) => {
          const propObj = propertyList.find((p: any) => p.id === baseId);
          return propObj?.name ?? baseId;
        });
        
        // Sammle alle Werte von allen gewählten Merkmalen
        const allValuesList: string[] = [];
        req.baseNames.forEach((baseId: string) => {
          if (req.valueMap && req.valueMap[baseId]) {
            const values = req.valueMap[baseId]
              .map((valId: string) => {
                const valObj = getValuesForProperty(baseId).find(
                  (v: any) => v.id === valId
                );
                return valObj?.name ?? valId;
              })
              .filter((v: string) => !!v);
            allValuesList.push(...values);
          }
        });
        
        enrichedRequirements.push({
          type: "property",
          propertySet: propertySetName,
          baseNames: baseNamesList, // Liste der Merkmalsnamen für Enumeration
          valueList: allValuesList.length > 0 ? allValuesList : undefined,
          dataType: req.dataType,
          uri: getPropertySetUri(propertySetName),
          cardinality: req.cardinality,
        } as any);
      } else if (req.type === "classification") {
        // Classification: System Name verwenden
        const modelName = getModelNameById(req.value as string);
        
        if (req.selectedClasses && req.selectedClasses.length > 0) {
          // Mit gewählten Klassen: Value als Enumeration, System als Pattern
          enrichedRequirements.push({
            type: "classification",
            value: req.value,
            modelName: modelName, // Als Pattern für System
            valueNames: req.classNames || [], // Als Enumeration für Value
          });
        } else {
          // Nur Modell gewählt: Nur System als Pattern
          enrichedRequirements.push({
            type: "classification",
            value: req.value,
            modelName: modelName, // Als Pattern für System
            // Keine valueNames = kein Value-Element in XML
          });
        }
      } else if (req.type === "attribute") {
        // Attribute: Abhängig von Applicability
        if (applicabilityType === "classification") {
          // Bei Classification Applicability: Nur Modellname als Pattern
          const modelName = getModelNameById(req.value as string);
          enrichedRequirements.push({
            type: "attribute",
            value: req.value,
            valueNames: modelName, // Als Pattern für Name Attribut
          });
        } else {
          // Bei Type Applicability: Klassenname als Pattern
          const className = getClassNameById(req.value as string);
          enrichedRequirements.push({
            type: "attribute",
            value: req.value,
            valueNames: className, // Als Pattern für Name Attribut
          });
        }
      }
    });

    const newSpec = {
      id: editingRowId || Date.now(), // Verwende die vorhandene ID beim Bearbeiten
      name: specName,
      applicabilityType,
      ifcVersion,
      requirements: enrichedRequirements,
      ifcClass:
        applicabilityType === "type"
          ? ifcClass
          : applicabilityType === "classification"
          ? "IFCCLASSIFICATION"
          : undefined,
    };

    if (editingRowId) {
      // Bestehende Specification überschreiben
      setSpecRows((rows) => 
        rows.map(row => row.id === editingRowId ? newSpec : row)
      );
      setEditingRowId(null);
    } else {
      // Neue Specification hinzufügen
      setSpecRows((rows) => [...rows, newSpec]);
    }

    setSpecName("");
    setApplicabilityType("type");
    setIfcVersion("IFC4");
    setRequirements([]);
    setIfcClass("");
    setAddRowMode(false);
    setIsIdsGenerated(false);
  };

  const handleRemoveSpec = (id: number) => {
    setSpecRows((rows: any) => rows.filter((r: any) => r.id !== id));
    // Falls die zu löschende Specification gerade bearbeitet wird, Bearbeitung beenden
    if (editingRowId === id) {
      setEditingRowId(null);
      setAddRowMode(false);
      setSpecName("");
      setApplicabilityType("type");
      setIfcVersion("IFC4");
      setRequirements([]);
      setIfcClass("");
    }
    setIsIdsGenerated(false); // Reset beim Entfernen von Specs
  };

  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          <T keyName="ids_export.title">Information Delivery Specification</T>
        </Typography>
      </Box>
      
      {/* IDS Name (Titel) */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="IDS Name"
          value={idsTitle}
          onChange={(e) => setIdsTitle(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Inline Spezifikationszeilen */}
      <Box sx={{ mb: 3 }}>
        {specRows.map((row: any) => (
          <Paper
            key={row.id}
            sx={{ mb: 2, p: 2, background: "#f7f7f7", position: "relative" }}
          >
            <Box sx={{ position: "absolute", right: 8, top: 8, display: "flex", gap: 1 }}>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditSpec(row.id)}
                size="small"
                disabled={addRowMode}
                color="primary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="remove"
                onClick={() => handleRemoveSpec(row.id)}
                size="small"
                disabled={addRowMode}
                color="error"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {row.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Applicability:{" "}
              {row.applicabilityType === "type"
                ? "Type (IFC Klasse)"
                : row.applicabilityType}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              IFC Version: {row.ifcVersion}
            </Typography>
            {row.applicabilityType === "type" && row.ifcClass && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                IFC Klasse: {row.ifcClass}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mb: 1 }}>
              Requirements:
              {row.requirements.length === 0 && <em> Keine</em>}
              {row.requirements.map((req: any, idx: number) => (
                <span key={idx} style={{ marginLeft: 8 }}>
                  [{req.type.charAt(0).toUpperCase() + req.type.slice(1)}]{" "}
                  {Array.isArray((req as any).valueNames)
                    ? (req as any).valueNames.join(", ")
                    : (req as any).valueNames || ""}
                  {idx < row.requirements.length - 1 ? "," : ""}
                </span>
              ))}
            </Typography>
          </Paper>
        ))}

        {addRowMode && (
          <Paper sx={{ mb: 2, p: 2, position: "relative" }}>
            <IconButton
              aria-label="close"
              onClick={() => setAddRowMode(false)}
              size="small"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box sx={{ mb: 2 }}>
              <TextField
                label={editingRowId ? "Specification bearbeiten" : "Name der Specification"}
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
                fullWidth
                autoFocus
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
              Applicability (Anwendbarkeit)
            </Typography>
            <RadioGroup
              row
              value={applicabilityType}
              onChange={(e) => {
                const newType = e.target.value as "type" | "classification";
                setApplicabilityType(newType);
                // Requirements anpassen basierend auf neuer Applicability
                if (newType === "classification") {
                  // Bei Classification: Nur Attribute erlaubt, alle anderen Requirements entfernen
                  const attributeReqs = requirements.filter(req => req.type === "attribute");
                  setRequirements(attributeReqs.length > 0 ? attributeReqs : [{ type: "attribute", value: "" }]);
                } else {
                  // Bei Type: Attribute nicht erlaubt, alle Attribute-Requirements entfernen
                  const nonAttributeReqs = requirements.filter(req => req.type !== "attribute");
                  setRequirements(nonAttributeReqs.length > 0 ? nonAttributeReqs : [{ type: "property", propertySet: "", baseNames: [], valueMap: {}, dataType: "", uri: "", cardinality: "required" }]);
                }
              }}
            >
              <FormControlLabel
                value="type"
                control={<Radio />}
                label="Type (IFC Klasse)"
              />
              <FormControlLabel
                value="classification"
                control={<Radio />}
                label="Klassifikation (Classification)"
              />
            </RadioGroup>
            {/* IFC Klasse Feld nur wenn Applicability "type" */}
            {applicabilityType === "type" && (
              <Box sx={{ mt: 2, mb: 2, position: "relative" }}>
                <TextField
                  label="IFC Klasse"
                  placeholder="Bitte IFC Klasse eingeben (z.B. IFCWALL)"
                  value={ifcClass}
                  onChange={(e) => setIfcClass(e.target.value.toUpperCase())}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  onBlur={() =>
                    setTimeout(() => setShowIfcSuggestions(false), 150)
                  }
                  onFocus={() => {
                    if (ifcClass.length >= 4 && ifcSuggestions.length > 0)
                      setShowIfcSuggestions(true);
                  }}
                  InputProps={{
                    endAdornment: showIfcSuggestions && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          zIndex: 10,
                          bgcolor: "background.paper",
                          border: "1px solid #ccc",
                          borderRadius: 1,
                          boxShadow: 2,
                          mt: 0.5,
                          maxHeight: 220,
                          overflowY: "auto",
                        }}
                      >
                        {ifcSuggestions.map((s: string) => (
                          <MenuItem
                            key={s}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setIfcClass(s);
                              setShowIfcSuggestions(false);
                            }}
                          >
                            {s}
                          </MenuItem>
                        ))}
                      </Box>
                    ),
                  }}
                />
              </Box>
            )}
            {/* Informationsfeld für Klassifikation */}
            {applicabilityType === "classification" && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <TextField
                  label="IFC Klasse"
                  value="IFCCLASSIFICATION"
                  fullWidth
                  variant="outlined"
                  disabled
                  helperText="Bei Klassifikation wird automatisch IFCCLASSIFICATION verwendet"
                />
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
              Requirements
            </Typography>
            <FormGroup>
              {requirements.map((req: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    gap: 1,
                    position: "relative",
                  }}
                >
                  <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel id={`req-type-label-${idx}`}>
                      Bitte Facette wählen
                    </InputLabel>
                    <Select
                      size="small"
                      labelId={`req-type-label-${idx}`}
                      value={req.type || ""}
                      label="Bitte Facette wählen"
                      onChange={(e) => {
                        handleRequirementTypeChange(idx, e.target.value as any);
                      }}
                    >
                      {applicabilityType === "classification" ? [
                        // Bei Classification Applicability: Nur Attribute
                        <MenuItem key="attribute" value="attribute">Attribute</MenuItem>
                      ] : [
                        // Bei Type Applicability: Property und Classification
                        <MenuItem key="property" value="property">Property</MenuItem>,
                        <MenuItem key="classification" value="classification">Classification</MenuItem>
                      ]}
                    </Select>
                  </FormControl>
                  {/* Classification Auswahl */}
                  {req.type === "classification" ? (
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                      {/* Modell/Fachmodell Auswahl */}
                      <FormControl fullWidth>
                        <InputLabel id={`model-dropdown-label-req-${idx}`}>
                          Klassifikationssystem auswählen
                        </InputLabel>
                        <Select
                          labelId={`model-dropdown-label-req-${idx}`}
                          value={req.value}
                          label="Klassifikationssystem auswählen"
                          onChange={(e) =>
                            handleRequirementChange(idx, e.target.value)
                          }
                        >
                          <MenuItem value="">
                            <em>Fachmodell aus datacat auswählen</em>
                          </MenuItem>
                          {modelOptions.map((opt: any) => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      
                      {/* Optionale Klassenauswahl */}
                      {req.value && (
                        <Box sx={{ position: 'relative' }}>
                          <Autocomplete
                            multiple
                            id={`class-autocomplete-req-${idx}`}
                            options={getClassesForModel(req.value)}
                            getOptionLabel={(option: any) => `${option.name}${option.groupName ? ` (${option.groupName})` : ''}`}
                            value={getClassesForModel(req.value).filter((classOpt: any) => 
                              (req.selectedClasses || []).includes(classOpt.id)
                            )}
                            onChange={(event, newValue) => {
                              handleRequirementChange(idx, {
                                selectedClasses: newValue.map((item: any) => item.id)
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Klassen auswählen (optional)"
                                placeholder="Klassen suchen..."
                              />
                            )}
                            renderTags={(value, getTagProps) =>
                              value.map((option: any, index: number) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                  <Box
                                    key={key}
                                    component="span"
                                    sx={{
                                      backgroundColor: 'primary.main',
                                      color: 'white',
                                      borderRadius: '16px',
                                      padding: '4px 8px',
                                      margin: '2px',
                                      fontSize: '0.875rem',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      '& .MuiChip-deleteIcon': {
                                        color: 'white',
                                        '&:hover': {
                                          color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                      }
                                    }}
                                    {...tagProps}
                                  >
                                    {option.name}
                                    <CloseIcon 
                                      sx={{ 
                                        ml: 0.5, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 0.7 }
                                      }}
                                      onClick={() => {
                                        const newSelected = (req.selectedClasses || []).filter((id: string) => id !== option.id);
                                        handleRequirementChange(idx, {
                                          selectedClasses: newSelected
                                        });
                                      }}
                                    />
                                  </Box>
                                );
                              })
                            }
                            filterOptions={(options, { inputValue }) => {
                              return options.filter((option: any) =>
                                option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                                (option.groupName && option.groupName.toLowerCase().includes(inputValue.toLowerCase()))
                              );
                            }}
                          />
                          {getClassesForModel(req.value).length > 0 && (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ mt: 1, mb: 1 }}
                              onClick={() => {
                                const allClassIds = getClassesForModel(req.value).map((cls: any) => cls.id);
                                handleRequirementChange(idx, {
                                  selectedClasses: allClassIds
                                });
                              }}
                            >
                              Alle auswählen ({getClassesForModel(req.value).length})
                            </Button>
                          )}
                        </Box>
                      )}
                    </Box>
                  ) : req.type === "attribute" ? (
                    <Box sx={{ flex: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel id={`model-dropdown-label-attr-${idx}`}>
                          {applicabilityType === "classification" 
                            ? "Fachmodell/Referenzdokument auswählen"
                            : "Klasse auswählen"
                          }
                        </InputLabel>
                        <Select
                          labelId={`model-dropdown-label-attr-${idx}`}
                          value={req.value || ""}
                          label={applicabilityType === "classification" 
                            ? "Fachmodell/Referenzdokument auswählen"
                            : "Klasse auswählen"
                          }
                          onChange={(e) =>
                            handleRequirementChange(idx, e.target.value)
                          }
                        >
                          <MenuItem value="">
                            <em>
                              {applicabilityType === "classification" 
                                ? "Fachmodell/Referenzdokument auswählen"
                                : "Klasse auswählen"
                              }
                            </em>
                          </MenuItem>
                          {applicabilityType === "classification" 
                            ? modelOptions.map((opt: any) => (
                                <MenuItem key={opt.id} value={opt.id}>
                                  {opt.name}
                                </MenuItem>
                              ))
                            : allClassOptions.map((opt: any) => (
                                <MenuItem key={opt.id} value={opt.id}>
                                  {opt.name} {opt.groupName && `(${opt.groupName})`}
                                </MenuItem>
                              ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
                  ) : req.type === "property" ? (
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                      {/* propertySet Auswahl */}
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id={`propertygroup-dropdown-label-${idx}`}>
                          Merkmalsgruppe (PropertySet)
                        </InputLabel>
                        <Select
                          labelId={`propertygroup-dropdown-label-${idx}`}
                          value={req.propertySet || ""}
                          label="Merkmalsgruppe (PropertySet)"
                          onChange={(e) =>
                            handleRequirementChange(idx, {
                              ...req,
                              propertySet: e.target.value,
                              baseNames: [],
                              valueMap: {},
                            })
                          }
                          disabled={allItemsLoading}
                        >
                          <MenuItem value="">
                            <em>Merkmalsgruppe auswählen</em>
                          </MenuItem>
                          {allItemsLoading && (
                            <MenuItem disabled>
                              <em>Lade Merkmalsgruppen...</em>
                            </MenuItem>
                          )}
                          {propertyGroupOptions.length === 0 && !allItemsLoading && (
                            <MenuItem disabled>
                              <em>Keine Merkmalsgruppen gefunden</em>
                            </MenuItem>
                          )}
                          {propertyGroupOptions.map((opt: any) => (
                            <MenuItem key={opt.id} value={opt.name ?? ""}>
                              {opt.name} {/* Debug: Zeige auch die Tags */}
                              <span style={{ color: "#888", fontSize: "0.8em" }}>
                                {opt.tags && Array.isArray(opt.tags)
                                  ? " [" + opt.tags.map((t: any) => t.name).join(", ") + "]"
                                  : ""}
                              </span>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* URI automatisch anzeigen */}
                      {req.propertySet && (
                        <TextField
                          label="URI (automatisch)"
                          value={getPropertySetUri(req.propertySet)}
                          fullWidth
                          sx={{ mb: 1 }}
                          InputProps={{ readOnly: true }}
                        />
                      )}
                      {/* baseNames Auswahl (Mehrfachauswahl Merkmale) */}
                      {req.propertySet && (
                        <Box sx={{ position: 'relative', mb: 1 }}>
                          <Autocomplete
                            multiple
                            id={`property-basenames-autocomplete-${idx}`}
                            options={getPropertiesForPropertySet(req.propertySet ?? "")}
                            getOptionLabel={(option: any) => option.name || option.id}
                            value={getPropertiesForPropertySet(req.propertySet ?? "").filter((prop: any) => 
                              (req.baseNames || []).includes(prop.id)
                            )}
                            onChange={(event, newValue) => {
                              handleRequirementChange(idx, {
                                ...req,
                                baseNames: newValue.map((item: any) => item.id),
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Merkmale auswählen"
                                placeholder="Merkmale suchen..."
                              />
                            )}
                            renderTags={(value, getTagProps) =>
                              value.map((option: any, index: number) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                  <Box
                                    key={key}
                                    component="span"
                                    sx={{
                                      backgroundColor: 'secondary.main',
                                      color: 'white',
                                      borderRadius: '16px',
                                      padding: '4px 8px',
                                      margin: '2px',
                                      fontSize: '0.875rem',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      '& .MuiChip-deleteIcon': {
                                        color: 'white',
                                        '&:hover': {
                                          color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                      }
                                    }}
                                    {...tagProps}
                                  >
                                    {option.name}
                                    <CloseIcon 
                                      sx={{ 
                                        ml: 0.5, 
                                        fontSize: '16px', 
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 0.7 }
                                      }}
                                      onClick={() => {
                                        const newBaseNames = (req.baseNames || []).filter((id: string) => id !== option.id);
                                        handleRequirementChange(idx, {
                                          ...req,
                                          baseNames: newBaseNames,
                                        });
                                      }}
                                    />
                                  </Box>
                                );
                              })
                            }
                            filterOptions={(options, { inputValue }) => {
                              return options.filter((option: any) =>
                                (option.name || '').toLowerCase().includes(inputValue.toLowerCase())
                              );
                            }}
                          />
                          {getPropertiesForPropertySet(req.propertySet ?? "").length > 0 && (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ mt: 1, mb: 1 }}
                              onClick={() => {
                                const allPropertyIds = getPropertiesForPropertySet(req.propertySet ?? "").map((prop: any) => prop.id);
                                handleRequirementChange(idx, {
                                  ...req,
                                  baseNames: allPropertyIds,
                                });
                              }}
                            >
                              Alle auswählen ({getPropertiesForPropertySet(req.propertySet ?? "").length})
                            </Button>
                          )}
                        </Box>
                      )}
                      {/* Werte-Auswahl für jedes gewählte Merkmal */}
                      {req.propertySet &&
                        Array.isArray(req.baseNames) &&
                        req.baseNames.map((baseId: string) => {
                          const propertyName = getPropertiesForPropertySet(req.propertySet ?? "").find((p) => p.id === baseId)?.name;
                          const availableValues = getValuesForProperty(baseId);
                          
                          return (
                            <Box key={baseId} sx={{ mb: 1 }}>
                              <Autocomplete
                                multiple
                                id={`property-values-autocomplete-${idx}-${baseId}`}
                                options={availableValues}
                                getOptionLabel={(option: any) => option.name || option.id}
                                value={availableValues.filter((val: any) => 
                                  (req.valueMap?.[baseId] || []).includes(val.id)
                                )}
                                onChange={(event, newValue) => {
                                  const newValueMap = { ...(req.valueMap || {}) };
                                  newValueMap[baseId] = newValue.map((item: any) => item.id);
                                  handleRequirementChange(idx, {
                                    ...req,
                                    valueMap: newValueMap,
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label={`Werte für ${propertyName}`}
                                    placeholder="Werte suchen..."
                                  />
                                )}
                                renderTags={(value, getTagProps) =>
                                  value.map((option: any, index: number) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return (
                                      <Box
                                        key={key}
                                        component="span"
                                        sx={{
                                          backgroundColor: 'success.main',
                                          color: 'white',
                                          borderRadius: '16px',
                                          padding: '4px 8px',
                                          margin: '2px',
                                          fontSize: '0.875rem',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          '& .MuiChip-deleteIcon': {
                                            color: 'white',
                                            '&:hover': {
                                              color: 'rgba(255, 255, 255, 0.7)'
                                            }
                                          }
                                        }}
                                        {...tagProps}
                                      >
                                        {option.name}
                                        <CloseIcon 
                                          sx={{ 
                                            ml: 0.5, 
                                            fontSize: '16px', 
                                            cursor: 'pointer',
                                            '&:hover': { opacity: 0.7 }
                                          }}
                                          onClick={() => {
                                            const newValueMap = { ...(req.valueMap || {}) };
                                            newValueMap[baseId] = (newValueMap[baseId] || []).filter((id: string) => id !== option.id);
                                            handleRequirementChange(idx, {
                                              ...req,
                                              valueMap: newValueMap,
                                            });
                                          }}
                                        />
                                      </Box>
                                    );
                                  })
                                }
                                filterOptions={(options, { inputValue }) => {
                                  return options.filter((option: any) =>
                                    (option.name || '').toLowerCase().includes(inputValue.toLowerCase())
                                  );
                                }}
                              />
                              {availableValues.length > 0 && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  sx={{ mt: 1, mb: 1 }}
                                  onClick={() => {
                                    const allValueIds = availableValues.map((val: any) => val.id);
                                    const newValueMap = { ...(req.valueMap || {}) };
                                    newValueMap[baseId] = allValueIds;
                                    handleRequirementChange(idx, {
                                      ...req,
                                      valueMap: newValueMap,
                                    });
                                  }}
                                >
                                  Alle auswählen ({availableValues.length})
                                </Button>
                              )}
                            </Box>
                          );
                        })}
                      {/* dataType Auswahl */}
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id={`datatype-label-${idx}`}>dataType (optional)</InputLabel>
                        <Select
                          labelId={`datatype-label-${idx}`}
                          value={req.dataType || ""}
                          label="dataType (optional)"
                          onChange={(e) =>
                            handleRequirementChange(idx, {
                              ...req,
                              dataType: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="">
                            <em>dataType auswählen</em>
                          </MenuItem>
                          {DATA_TYPE_OPTIONS.map((dt) => (
                            <MenuItem key={dt} value={dt}>
                              {dt}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* cardinality */}
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id={`cardinality-label-${idx}`}>Cardinality</InputLabel>
                        <Select
                          labelId={`cardinality-label-${idx}`}
                          value={req.cardinality || "required"}
                          label="Cardinality"
                          onChange={(e) =>
                            handleRequirementChange(idx, {
                              ...req,
                              cardinality: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="required">required</MenuItem>
                          <MenuItem value="optional">optional</MenuItem>
                          <MenuItem value="prohibited">prohibited</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  ) : null}
                  <IconButton
                    aria-label="remove"
                    onClick={() => handleRemoveRequirement(idx)}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={handleAddRequirement}
                sx={{ mt: 1 }}
              >
                Requirement hinzufügen
              </Button>
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
              IFC Version
            </Typography>
            <FormControl fullWidth>
              <Select
                value={ifcVersion}
                label="IFC Version"
                onChange={(e) => setIfcVersion(e.target.value)}
              >
                <MenuItem value="IFC2X3">IFC2X3</MenuItem>
                <MenuItem value="IFC4">IFC4</MenuItem>
                <MenuItem value="IFC4X3">IFC4X3</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                onClick={() => {
                  setAddRowMode(false);
                  setEditingRowId(null);
                  setSpecName("");
                  setApplicabilityType("type");
                  setIfcVersion("IFC4");
                  setRequirements([]);
                  setIfcClass("");
                }}
                color="secondary"
                sx={{ mr: 1 }}
              >
                Abbrechen
              </Button>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={() => {
                  setSaveLoadMode('specification');
                  setSaveLoadDialogOpen(true);
                }}
                disabled={!specName}
                sx={{ mr: 1 }}
              >
                Spec speichern
              </Button>
              <Button
                onClick={handleSaveSpec}
                variant="contained"
                disabled={
                  !specName || (applicabilityType === "type" && !ifcClass)
                }
              >
                {editingRowId ? "Aktualisieren" : "Speichern"}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddRowMode(true);
            // Beim Öffnen des Add-Modus ein initiales Requirement basierend auf current applicabilityType hinzufügen
            if (requirements.length === 0) {
              const initialReq = applicabilityType === "classification"
                ? { type: "attribute" as const, value: "" }
                : { type: "property" as const, propertySet: "", baseNames: [], valueMap: {}, dataType: "", uri: "", cardinality: "required" };
              setRequirements([initialReq]);
            }
          }}
          disabled={addRowMode}
        >
          Add Specification
        </Button>

        <Button
          variant="outlined"
          startIcon={<FolderOpenIcon />}
          onClick={() => {
            setSaveLoadMode('ids');
            setSaveLoadDialogOpen(true);
          }}
        >
          Speichern & Laden
        </Button>
      </Box>
      
      {/* IDS Buttons nebeneinander - immer ganz unten */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleGenerateIds}
          disabled={specRows.length === 0}
        >
          IDS Datei erzeugen
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleDownloadIds}
          disabled={!isIdsGenerated}
        >
          IDS Datei herunterladen
        </Button>
      </Box>

      {/* Save/Load Dialog */}
      <SaveLoadDialog
        open={saveLoadDialogOpen}
        onClose={() => setSaveLoadDialogOpen(false)}
        currentIDSTitle={idsTitle}
        currentSpecRows={specRows}
        currentSpec={getCurrentSpecificationData()}
        onLoadIDS={handleLoadIDS}
        onLoadSpec={handleLoadSpecification}
        mode={saveLoadMode}
      />
    </Container>
  );
};

export default IDSExportView;