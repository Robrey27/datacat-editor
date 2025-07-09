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
import { usePropertyTreeQuery } from "../generated/types";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { IDS_IFC_ENTITIES } from "../components/idsEntities";
import { convertToIDSXml } from "../components/idsXmlConverter";
import { useSnackbar } from "notistack";
import { validateIdsXml } from "../components/idsValidator";
import { useProfile } from "../providers/ProfileProvider";

const GROUP_TAG_ID = "5997da9b-a716-45ae-84a9-e2a7d186bcf9";
const MODEL_TAG_ID = "6f96aaa7-e08f-49bb-ac63-93061d4c5db2";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

export const IDSExportView: React.FC = () => {
  const { profile } = useProfile();
  const [specRows, setSpecRows] = useState<
    {
      id: number;
      name: string;
      applicabilityType: "type" | "classification";
      ifcVersion: string;
      requirements: {
        type: "classification" | "attribute";
        value: string[] | string;
        modelId?: string;
      }[];
      ifcClass?: string;
    }[]
  >([]);
  const [addRowMode, setAddRowMode] = useState(false);
  const [specName, setSpecName] = useState("");
  const [applicabilityType, setApplicabilityType] = useState<"type" | "classification">("type");
  const [ifcVersion, setIfcVersion] = useState("IFC4");
  const [requirements, setRequirements] = useState<
    {
      type: "classification" | "attribute";
      value: string[] | string;
      modelId?: string;
    }[]
  >([]);
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

  // Fachmodelle extrahieren
  const modelOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes) return [];
    return data.hierarchy.nodes
      .filter(
        (n) =>
          n.recordType === "Bag" &&
          Array.isArray(n.tags) &&
          n.tags.some((t: any) => t.id === MODEL_TAG_ID)
      )
      .map((n) => ({
        id: n.id,
        name: n.name,
      }))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [data]);

  // Alle Klassen aller Modelle (für Requirements)
  const allClassOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes || !data?.hierarchy?.paths) return [];
    const nodes = data.hierarchy.nodes;
    const paths = data.hierarchy.paths;
    const result: {
      name: string;
      id: string;
      groupName?: string;
      modelName?: string;
      modelId?: string;
    }[] = [];
    const seen = new Set<string>();
    paths.forEach((path) => {
      let modelName = "";
      let modelId = "";
      let groupName = "";
      let classNode: any = null;
      path.forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        if (node) {
          if (node.recordType === "Bag" && Array.isArray(node.tags)) {
            if (node.tags.some((t: any) => t.id === GROUP_TAG_ID))
              groupName = node.name ?? "";
            if (node.tags.some((t: any) => t.id === MODEL_TAG_ID)) {
              modelName = node.name ?? "";
              modelId = node.id;
            }
          }
          if (node.recordType === "Subject") classNode = node;
        }
      });
      if (classNode && classNode.name && modelId && !seen.has(classNode.id)) {
        result.push({
          name: classNode.name,
          id: classNode.id,
          groupName: groupName || undefined,
          modelName: modelName || undefined,
          modelId,
        });
        seen.add(classNode.id);
      }
    });
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

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
    const requirementType = applicabilityType === "classification" ? "attribute" : "classification";
    setRequirements((reqs) => [...reqs, { type: requirementType, value: applicabilityType === "classification" ? [] : "" }]);
  };

  // Requirement ändern
  const handleRequirementChange = (
    idx: number,
    value: string[] | string,
    modelId?: string
  ) => {
    setRequirements((reqs) =>
      reqs.map((r, i) =>
        i === idx
          ? { ...r, value, ...(modelId !== undefined ? { modelId } : {}) }
          : r
      )
    );
  };

  // Requirement-Typ ändern
  const handleRequirementTypeChange = (
    idx: number,
    type: "classification" | "attribute"
  ) => {
    setRequirements((reqs) =>
      reqs.map((r, i) =>
        i === idx
          ? {
              ...r,
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
    setRequirements((reqs) => reqs.filter((_, i) => i !== idx));
  };

  // Hilfsfunktionen für Namensauflösung
  const getModelNameById = (id: string) =>
    modelOptions.find((m) => m.id === id)?.name || id;
  const getClassNameById = (id: string) =>
    allClassOptions.find((c) => c.id === id)?.name || id;

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
    // Überprüfe ob Benutzer angemeldet ist
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
      author: profile.email, // E-Mail wird im Hintergrund verwendet
      version: "1.0",
      date: new Date().toISOString().split("T")[0],
    };
    
    // Convert specRows to match IDSSpec type by mapping classification to type
    const convertedSpecs = specRows.map(spec => ({
      ...spec,
      applicabilityType: "type" as const, // Always convert to "type" for XML generation
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

      // Dateiname aus idsTitle generieren, ungültige Zeichen entfernen, Fallback falls leer
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

  // Reset der IDS-Generierung wenn Specifications geändert werden
  const handleSaveSpec = () => {
    // Requirements mit Namen anreichern
    const enrichedRequirements = requirements.map((req) => {
      if (req.type === "classification") {
        return {
          ...req,
          valueNames:
            typeof req.value === "string" && req.value
              ? getModelNameById(req.value)
              : "",
          modelName:
            typeof req.value === "string" && req.value
              ? getModelNameById(req.value)
              : "",
        };
      }
      if (req.type === "attribute") {
        let valueNames: string[] = [];
        if (Array.isArray(req.value)) {
          valueNames = req.value.map((id) => getClassNameById(id));
        }
        return {
          ...req,
          valueNames,
          modelName: req.modelId ? getModelNameById(req.modelId) : "",
        };
      }
      return req;
    });

    setSpecRows((rows) => [
      ...rows,
      {
        id: Date.now(),
        name: specName,
        applicabilityType,
        ifcVersion,
        requirements: enrichedRequirements,
        ifcClass: applicabilityType === "type" ? ifcClass : applicabilityType === "classification" ? "IFCCLASSIFICATION" : undefined,
      },
    ]);
    setSpecName("");
    setApplicabilityType("type");
    setIfcVersion("IFC4");
    setRequirements([]);
    setIfcClass("");
    setAddRowMode(false);
    setIsIdsGenerated(false); // Reset beim Hinzufügen neuer Specs
  };

  const handleRemoveSpec = (id: number) => {
    setSpecRows((rows) => rows.filter((r) => r.id !== id));
    setIsIdsGenerated(false); // Reset beim Entfernen von Specs
  };

  const fetchXsd = async (): Promise<string> => {
    const res = await fetch("/ids.xsd");
    if (!res.ok) throw new Error("Konnte ids.xsd nicht laden");
    return await res.text();
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
        {specRows.map((row) => (
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
              {row.requirements.map((req, idx) => (
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
                        {ifcSuggestions.map((s) => (
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
              {requirements.map((req, idx) => (
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
                          {modelOptions.map((opt) => (
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
                          {modelOptions.map((opt) => (
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
                              newValues.map((v) => v.id),
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