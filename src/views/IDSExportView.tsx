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
import { IDS_IFC_ENTITIES } from "../components/idsEntities";
import { convertToIDSXml } from "../components/idsXmlConverter";
import { useSnackbar } from "notistack";
import { validateIdsXml } from "../components/idsValidator";
import { useProfile } from "../providers/ProfileProvider";

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
        value: string[] | string;
        modelId?: string;
        valueNames?: string[] | string;
        modelName?: string;
      }
    | {
        type: "attribute";
        value: string[] | string;
        modelId?: string;
        valueNames?: string[] | string;
        modelName?: string;
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
  const [specName, setSpecName] = useState("");
  const [applicabilityType, setApplicabilityType] = useState<"type" | "classification">("type");
  const [ifcVersion, setIfcVersion] = useState("IFC4");
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [ifcClass, setIfcClass] = useState("");
  const [showIfcSuggestions, setShowIfcSuggestions] = useState(false);
  const [idsTitle, setIdsTitle] = useState("");
  const [isIdsGenerated, setIsIdsGenerated] = useState(false); 
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

  // Merkmalsgruppen extrahieren: DEBUG alle Nests anzeigen und dann filtern
  const propertyGroupOptions = useMemo(() => {
    console.log("=== Merkmalsgruppen Debug ===");
    console.log("🔍 useFindItemQuery Result:");
    console.log("Komplette allItemsData:", JSON.stringify(allItemsData, null, 2));
    console.log("loading:", allItemsLoading);
    console.log("error:", allItemsError);
    
    console.log("🔍 Direct Query Result:");
    console.log("Komplette directQueryData:", JSON.stringify(directQueryData, null, 2));
    console.log("directQueryLoading:", directQueryLoading);
    console.log("directQueryError:", directQueryError);
    
    // Verwende die direkte Query für den Test
    const dataToUse = directQueryData || allItemsData;
    const loadingToUse = directQueryLoading || allItemsLoading;
    const errorToUse = directQueryError || allItemsError;
    
    if (errorToUse) {
      console.log("GraphQL Error Details:", errorToUse);
    }
    
    if (!dataToUse) {
      console.log("Keine Daten verfügbar (beide Queries)");
      return [];
    }
    
    if (!dataToUse.search) {
      console.log("dataToUse.search ist null/undefined");
      return [];
    }
    
    console.log("Search object:", dataToUse.search);
    console.log("Total elements:", dataToUse.search.totalElements);
    console.log("Page info:", dataToUse.search.pageInfo);
    
    if (!dataToUse.search.nodes) {
      console.log("dataToUse.search.nodes ist null/undefined");
      return [];
    }
    
    console.log("Nodes Array:", dataToUse.search.nodes);
    console.log("Nodes Length:", dataToUse.search.nodes.length);
    console.log("Nodes Type:", typeof dataToUse.search.nodes);
    console.log("Is Array:", Array.isArray(dataToUse.search.nodes));
    
    if (dataToUse.search.nodes.length === 0) {
      console.log("❌ PROBLEM: Nodes Array ist leer, obwohl totalElements > 0!");
      console.log("Das deutet auf ein Fragment- oder Query-Problem hin.");
      return [];
    }
    
    console.log("Alle Nodes Details:", dataToUse.search.nodes.map((n: any) => ({
      id: n.id,
      name: n.name,
      recordType: n.recordType,
      tags: n.tags?.map((t: any) => ({ id: t.id, name: t.name }))
    })));
    
    // Filtere nur nach Nest recordType
    const nests = dataToUse.search.nodes.filter((n: any) => n.recordType === "Nest");
    console.log("Alle Nests:", nests);
    
    // Filtere nach Merkmalsgruppe
    const propertyGroups = nests.filter((n: any) => 
      Array.isArray(n.tags) && 
      n.tags.some((t: any) => 
        t.name === PROPERTY_GROUP_TAG_NAME || 
        t.id === PROPERTY_GROUP_TAG_ID
      )
    );
    console.log("Gefilterte Merkmalsgruppen:", propertyGroups);
    console.log("Filter-Kriterien:", {
      PROPERTY_GROUP_TAG_NAME,
      PROPERTY_GROUP_TAG_ID
    });
    console.log("=== Ende Debug ===");
    
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

  // Requirement hinzufügen
  const handleAddRequirement = () => {
    setRequirements((reqs) => [
      ...reqs,
      applicabilityType === "classification"
        ? { type: "attribute", value: [] }
        : { type: "classification", value: "" }
    ]);
  };

  // Hilfsfunktionen für PropertySet/Merkmal/Value - Performance optimiert
  const getPropertySetUri = useMemo(() => 
    (propertySetName: string) => {
      const propertyGroup = propertyGroupOptions.find((g: any) => g.name === propertySetName);
      if (!propertyGroup) return "";
      return `${window.location.origin}/propertyGroup/${propertyGroup.id}`;
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

  // Hilfsfunktion: dataType automatisch vorschlagen (z.B. nach baseName)
  function suggestDataType(baseName: string): string | undefined {
    // Einfache Heuristik: nach baseName Schlüsselwort suchen
    const name = baseName.toLowerCase();
    if (name.includes("datum") || name.includes("date")) return "IFCDATE";
    if (name.includes("zeit") || name.includes("time")) return "IFCTIME";
    if (name.includes("nummer") || name.includes("number")) return "IFCNUMBER";
    if (name.includes("id") || name.includes("identifier")) return "IFCIDENTIFIER";
    if (name.includes("text")) return "IFCTEXT";
    if (name.includes("name") || name.includes("bezeichnung") || name.includes("label")) return "IFCLABEL";
    if (name.includes("länge") || name.includes("length")) return "IFCLENGTHMEASURE";
    if (name.includes("fläche") || name.includes("area")) return "IFCAREAMEASURE";
    if (name.includes("volumen") || name.includes("volume")) return "IFCVOLUMEMEASURE";
    if (name.includes("winkel") || name.includes("angle")) return "IFCPLANEANGLEMEASURE";
    if (name.includes("real")) return "IFCREAL";
    if (name.includes("bool") || name.includes("ja/nein") || name.includes("yes/no")) return "IFCBOOLEAN";
    if (name.includes("integer") || name.includes("ganzzahl")) return "IFCINTEGER";
    return undefined;
  }

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
          // baseNames geändert: reset valueMap für nicht mehr gewählte baseNames und ggf. dataType vorschlagen
          if (value.baseNames) {
            const newValueMap: Record<string, string[]> = {};
            (value.baseNames as string[]).forEach((baseId: string) => {
              newValueMap[baseId] = (r as PropertyRequirement).valueMap?.[baseId] || [];
            });
            // Wenn nur ein baseName gewählt ist, dataType automatisch vorschlagen
            let autoDataType = r.dataType;
            if (value.baseNames.length === 1) {
              const propObj = getPropertiesForPropertySet(r.propertySet ?? "").find(
                (p) => p.id === value.baseNames[0]
              );
              if (propObj?.name) {
                autoDataType = suggestDataType(propObj.name) || "";
              }
            }
            return {
              ...r,
              ...value,
              valueMap: newValueMap,
              dataType: autoDataType,
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
        return {
          ...r,
          value,
          ...(modelId !== undefined ? { modelId } : {}),
        };
      })
    );
  };

  // Requirement-Typ ändern
  const handleRequirementTypeChange = (
    idx: number,
    type: "classification" | "attribute" | "property"
  ) => {
    setRequirements((reqs: any) =>
      reqs.map((r: any, i: number) =>
        i === idx
          ? type === "property"
            ? {
                type: "property",
                propertySet: "",
                baseNames: [],
                valueMap: {},
                dataType: "",
                uri: "",
                cardinality: "required",
              }
            : {
                type,
                value: type === "attribute" ? [] : "",
                modelId: undefined,
              }
          : r
      )
    );
  };

  // Requirement entfernen
  const handleRemoveRequirement = (idx: number) => {
    setRequirements((reqs: any) => reqs.filter((_: any, i: number) => i !== idx));
  };

  // Hilfsfunktionen für Namensauflösung
  const getModelNameById = (id: string) =>
    modelOptions.find((m: any) => m.id === id)?.name || id;
  const getClassNameById = (id: string) =>
    allClassOptions.find((c: any) => c.id === id)?.name || id;

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
      const result = await validateIdsXml(xml, xsd);

      if (!result.valid) {
        enqueueSnackbar("IDS-Datei ist **nicht gültig**:\n" + result.errors?.join("\n"), { variant: "error" });
        return;
      }

      const blob = new Blob([xml], { type: "application/xml" });
      const url = window.URL.createObjectURL(blob);

      let filename = (idsTitle || "Meine IDS Datei").trim();
      filename = filename.replace(/[^a-zA-Z0-9_\-äöüÄÖÜß ]+/g, ""); 
      filename = filename.replace(/\s+/g, "_");
      if (!filename) filename = "IDS_Datei";
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

  // handleSaveSpec: Property-Requirements für jede baseName erzeugen
  const handleSaveSpec = () => {
    const enrichedRequirements: Requirement[] = [];
    requirements.forEach((req) => {
      if (
        req.type === "property" &&
        req.propertySet &&
        Array.isArray(req.baseNames)
      ) {
        // propertySet und baseNames sind garantiert gesetzt
        const propertySetName = req.propertySet!;
        const propertyList = getPropertiesForPropertySet(propertySetName);
        req.baseNames.forEach((baseId: string) => {
          const propObj = propertyList.find((p: any) => p.id === baseId);
          const baseName = propObj?.name ?? baseId;
          const valueList =
            req.valueMap && req.valueMap[baseId]
              ? req.valueMap[baseId]
                  .map((valId: string) => {
                    const valObj = getValuesForProperty(baseId).find(
                      (v: any) => v.id === valId
                    );
                    return valObj?.name ?? valId;
                  })
                  .filter((v: string) => !!v)
              : [];
          enrichedRequirements.push({
            type: "property",
            propertySet: propertySetName,
            baseNames: [baseId], // für Konsistenz, aber im Export wird baseName erwartet
            baseName: baseName, // für den Export
            valueList: valueList,
            dataType: req.dataType,
            uri: getPropertySetUri(propertySetName),
            cardinality: req.cardinality,
          } as any); // as any, weil baseName nicht im PropertyRequirement-Typ ist, aber für den Export gebraucht wird
        });
      } else if (req.type === "classification" || req.type === "attribute") {
        enrichedRequirements.push(req);
      }
    });

    setSpecRows((rows) => [
      ...rows,
      {
        id: Date.now(),
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
      },
    ]);
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
            <IconButton
              aria-label="remove"
              onClick={() => handleRemoveSpec(row.id)}
              size="small"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
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
                label="Name der Specification"
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
                // Auto-select attribute requirement when classification is selected
                if (newType === "classification" && requirements.length === 0) {
                  setRequirements([{ type: "attribute", value: [] }]);
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
                      value={req.type}
                      label="Bitte Facette wählen"
                      onChange={(e) =>
                        handleRequirementTypeChange(idx, e.target.value as any)
                      }
                    >
                      {applicabilityType !== "classification" && (
                        <MenuItem value="classification">Classification</MenuItem>
                      )}
                      <MenuItem value="attribute">Attribute</MenuItem>
                      <MenuItem value="property">Property</MenuItem>
                    </Select>
                  </FormControl>
                  {/* Classification Auswahl */}
                  {req.type === "classification" ? (
                    <Box sx={{ flex: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel id={`model-dropdown-label-req-${idx}`}>
                          Klassifikationssystem auswählen
                        </InputLabel>
                        <Select
                          labelId={`model-dropdown-label-req-${idx}`}
                          value={req.value}
                          label="Fachmodell auswählen"
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
                    </Box>
                  ) : req.type === "attribute" ? (
                    <Box
                      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      {/* 1. Fachmodell-Auswahl */}
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id={`model-dropdown-label-attr-${idx}`}>
                          Fachmodell auswählen
                        </InputLabel>
                        <Select
                          labelId={`model-dropdown-label-attr-${idx}`}
                          value={req.modelId || ""}
                          label="Fachmodell auswählen"
                          onChange={(e) =>
                            handleRequirementChange(idx, [], e.target.value)
                          }
                        >
                          <MenuItem value="">
                            <em>Fachmodell auswählen</em>
                          </MenuItem>
                          {modelOptions.map((opt: any) => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* 2. Klassen-Auswahl mit Autocomplete Mehrfachauswahl und Suche */}
                      {req.modelId && (
                        <Autocomplete
                          multiple
                          fullWidth
                          disableCloseOnSelect
                          options={allClassOptions.filter(
                            (opt) => opt.modelId === req.modelId
                          )}
                          getOptionLabel={(opt) =>
                            `${opt.name}${
                              opt.groupName ? ` (${opt.groupName})` : ""
                            }${opt.modelName ? ` [${opt.modelName}]` : ""}`
                          }
                          value={allClassOptions.filter(
                            (opt) =>
                              Array.isArray(req.value) &&
                              req.value.includes(opt.id)
                          )}
                          onChange={(_, newValues) => {
                            handleRequirementChange(
                              idx,
                              newValues.map((v: any) => v.id),
                              req.modelId
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Klassen aus datacat auswählen"
                              placeholder="Klasse(n) suchen..."
                              variant="outlined"
                            />
                          )}
                          renderOption={(props, option, { selected }) => (
                            <li {...props} key={option.id}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography variant="body2">
                                  {option.name}
                                  {option.groupName && (
                                    <Typography
                                      variant="caption"
                                      component="span"
                                      sx={{ ml: 1, color: "text.secondary" }}
                                    >
                                      ({option.groupName})
                                    </Typography>
                                  )}
                                  {option.modelName && (
                                    <Typography
                                      variant="caption"
                                      component="span"
                                      sx={{ ml: 1, color: "text.secondary" }}
                                    >
                                      [{option.modelName}]
                                    </Typography>
                                  )}
                                </Typography>
                              </Box>
                            </li>
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                        />
                      )}
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
                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <InputLabel id={`property-basenames-label-${idx}`}>
                            Merkmale auswählen
                          </InputLabel>
                          <Select
                            labelId={`property-basenames-label-${idx}`}
                            multiple
                            value={req.baseNames || []}
                            label="Merkmale auswählen"
                            onChange={(e) =>
                              handleRequirementChange(idx, {
                                ...req,
                                baseNames: e.target.value as string[],
                              })
                            }
                            renderValue={(selected: any) =>
                              (selected as string[])
                                .map((id: string) => {
                                  const propSet = req.propertySet ?? "";
                                  const prop = getPropertiesForPropertySet(propSet).find(
                                    (p: any) => p.id === id
                                  );
                                  return prop?.name ?? id;
                                })
                                .join(", ")
                            }
                          >
                            {getPropertiesForPropertySet(req.propertySet ?? "").map(
                              (prop: any) => (
                                <MenuItem key={prop.id} value={prop.id}>
                                  {prop.name}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      )}
                      {/* Werte-Auswahl für jedes gewählte Merkmal */}
                      {req.propertySet &&
                        Array.isArray(req.baseNames) &&
                        req.baseNames.map((baseId: string) => (
                          <FormControl fullWidth sx={{ mb: 1 }} key={baseId}>
                            <InputLabel id={`property-values-label-${idx}-${baseId}`}>
                              Werte für {getPropertiesForPropertySet(req.propertySet ?? "").find((p) => p.id === baseId)?.name}
                            </InputLabel>
                            <Select
                              labelId={`property-values-label-${idx}-${baseId}`}
                              multiple
                              value={req.valueMap?.[baseId] || []}
                              label={`Werte für ${getPropertiesForPropertySet(req.propertySet ?? "").find((p) => p.id === baseId)?.name}`}
                              onChange={(e) => {
                                const newValueMap = { ...(req.valueMap || {}) };
                                newValueMap[baseId] = e.target.value as string[];
                                handleRequirementChange(idx, {
                                  ...req,
                                  valueMap: newValueMap,
                                });
                              }}
                              renderValue={(selected) =>
                                (selected as string[])
                                  .map((valId) => {
                                    const valObj = getValuesForProperty(baseId).find(
                                      (v) => v.id === valId
                                    );
                                    return valObj?.name ?? valId;
                                  })
                                  .join(", ")
                              }
                            >
                              {getValuesForProperty(baseId).map((val) => (
                                <MenuItem key={val.id} value={val.id}>
                                  {val.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ))}
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
                onClick={() => setAddRowMode(false)}
                color="secondary"
                sx={{ mr: 1 }}
              >
                Abbrechen
              </Button>
              <Button
                onClick={handleSaveSpec}
                variant="contained"
                disabled={
                  !specName || (applicabilityType === "type" && !ifcClass)
                }
              >
                Speichern
              </Button>
            </Box>
          </Paper>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddRowMode(true)}
          disabled={addRowMode}
        >
          Add Specification
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
    </Container>
  );
};

export default IDSExportView;