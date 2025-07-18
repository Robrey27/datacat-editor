import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Autocomplete,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { T, useTranslate } from "@tolgee/react";
import { 
  usePropertyTreeQuery,
} from "../generated/types";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

// Tag styling components (similar to IDSExportView)
const TagButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: theme.spacing(1),
  gap: theme.spacing(0.5),
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.25),
  fontSize: theme.typography.fontSize,
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
}));

const TagFilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

interface CreatePropertySetDialogProps {
  open: boolean;
  onClose: () => void;
  onPropertySetCreated: (propertySetName: string, propertySetId: string, selectedProperties: any[]) => void;
  availableTags?: string[];
}

export const CreatePropertySetDialog: React.FC<CreatePropertySetDialogProps> = ({
  open,
  onClose,
  onPropertySetCreated,
  availableTags = [],
}) => {
  const { t } = useTranslate();
  const [propertySetName, setPropertySetName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  // Lade alle Properties aus DataCat
  const { data: propertyData, loading: propertyLoading } = usePropertyTreeQuery({
    fetchPolicy: "cache-first",
  });

  // Extrahiere alle verfügbaren Properties
  const allProperties = useMemo(() => {
    if (!propertyData?.hierarchy?.nodes) return [];
    
    return propertyData.hierarchy.nodes
      .filter((node: any) => node.recordType === "Property")
      .map((node: any) => ({
        id: node.id,
        name: node.name || `Property ${node.id}`,
        description: node.description || "",
        tags: node.tags || [], // Tag-Informationen hinzufügen
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
  }, [propertyData?.hierarchy?.nodes]);

  // Tag filtering handler
  const handleTagFilter = useCallback((tag: string | null) => {
    setSelectedTag(tag);
  }, []);

  // Helper function to add properties by tag
  const addPropertiesByTag = useCallback((tagName: string) => {
    if (!tagName) return;
    
    const taggedProperties = allProperties.filter((property: any) => {
      if (!property.tags || !Array.isArray(property.tags)) return false;
      return property.tags.some((tag: any) => tag.name === tagName || tag.id === tagName);
    });

    if (taggedProperties.length > 0) {
      const newSelectedProperties = [...selectedProperties];
      taggedProperties.forEach((prop: any) => {
        if (!newSelectedProperties.some(p => p.id === prop.id)) {
          newSelectedProperties.push(prop);
        }
      });
      setSelectedProperties(newSelectedProperties);
      enqueueSnackbar(
        <T keyName="create_property_set.notifications.properties_with_tag_added" params={{ count: taggedProperties.length, tag: tagName }} />, 
        { variant: "success" }
      );
    } else {
      enqueueSnackbar(
        <T keyName="create_property_set.notifications.no_properties_with_tag" params={{ tag: tagName }} />, 
        { variant: "info" }
      );
    }
  }, [allProperties, selectedProperties, enqueueSnackbar]);

  // Reset Dialog beim Schließen
  useEffect(() => {
    if (!open) {
      setPropertySetName("");
      setDescription("");
      setSelectedProperties([]);
      setIsCreating(false);
      setSelectedTag(null);
    }
  }, [open]);

  const handleCreate = async () => {
    if (!propertySetName.trim()) {
      enqueueSnackbar(
        <T keyName="create_property_set.notifications.name_required" />, 
        { variant: "warning" }
      );
      return;
    }

    setIsCreating(true);

    try {
      // Generiere eine lokale ID für die PropertySet
      const newPropertySetId = `local-property-set-${Date.now()}`;
      
      enqueueSnackbar(
        <T keyName="create_property_set.notifications.created_successfully" params={{ name: propertySetName }} />, 
        { variant: "success" }
      );

      // Callback aufrufen um die neue PropertySet zu verwenden
      onPropertySetCreated(propertySetName.trim(), newPropertySetId, selectedProperties);
      
      onClose();
    } catch (error: any) {
      console.error("Fehler beim Erstellen des Propertysets:", error);
      enqueueSnackbar(
        <T keyName="create_property_set.notifications.creation_error" params={{ error: error.message || error }} />, 
        { variant: "error" }
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleRemoveProperty = (propertyToRemove: any) => {
    setSelectedProperties(prev => prev.filter(p => p.id !== propertyToRemove.id));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <T keyName="create_property_set.title" />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {/* Name des IFC Propertysets */}
          <TextField
            label={<T keyName="create_property_set.labels.property_set_name" />}
            value={propertySetName}
            onChange={(e) => setPropertySetName(e.target.value)}
            fullWidth
            required
            placeholder={t("create_property_set.placeholders.property_set_example")}
            autoFocus
          />

          {/* Beschreibung (optional) */}
          <TextField
            label={<T keyName="create_property_set.labels.description_optional" />}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
            placeholder={t("create_property_set.placeholders.description_text")}
          />

          <Divider sx={{ my: 1 }} />

          {/* Property-Auswahl */}
          <Typography variant="h6" component="h3">
            <T keyName="create_property_set.labels.assign_properties" />
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            <T keyName="create_property_set.info.selection_help" />
          </Alert>

          {/* Tag Filter für Merkmale */}
          {availableTags.length > 0 && (
            <TagFilterSection>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                <T keyName="create_property_set.tag_filter.properties" />
              </Typography>
              <TagButtonContainer>
                {availableTags.map((tag) => (
                  <TagChip
                    key={tag}
                    label={tag}
                    clickable
                    size="small"
                    color={selectedTag === tag ? "secondary" : "default"}
                    onClick={() => handleTagFilter(tag)}
                  />
                ))}
                <TagChip
                  label={<T keyName="create_property_set.tag_filter.all" />}
                  clickable
                  size="small"
                  color={selectedTag === null ? "secondary" : "default"}
                  onClick={() => handleTagFilter(null)}
                />
                {selectedTag && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => addPropertiesByTag(selectedTag)}
                    sx={{ ml: 1 }}
                  >
                    <T keyName="create_property_set.actions.add_all_with_tag" params={{ tag: selectedTag }} />
                  </Button>
                )}
              </TagButtonContainer>
            </TagFilterSection>
          )}

          <Autocomplete
            multiple
            options={allProperties}
            getOptionLabel={(option: any) => option.name}
            value={selectedProperties}
            onChange={(event, newValue) => setSelectedProperties(newValue)}
            loading={propertyLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label={<T keyName="create_property_set.labels.select_properties" />}
                placeholder={t("create_property_set.placeholders.search_and_select")}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option: any, index: number) => {
                const { key, onDelete, ...otherTagProps } = getTagProps({ index });
                return (
                  <Chip
                    key={key}
                    label={option.name}
                    {...otherTagProps}
                    onDelete={() => handleRemoveProperty(option)}
                    deleteIcon={<CloseIcon />}
                    color="primary"
                    variant="outlined"
                  />
                );
              })
            }
            filterOptions={(options, { inputValue }) => {
              return options.filter((option: any) =>
                option.name.toLowerCase().includes(inputValue.toLowerCase())
              );
            }}
            disabled={isCreating}
          />

          {selectedProperties.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              <T keyName="create_property_set.status.properties_selected" params={{ 
                count: selectedProperties.length, 
                plural: selectedProperties.length !== 1 ? "e" : "" 
              }} />
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isCreating}>
          <T keyName="create_property_set.actions.cancel" />
        </Button>
        <Button 
          onClick={handleCreate} 
          variant="contained" 
          disabled={!propertySetName.trim() || isCreating}
        >
          {isCreating ? <T keyName="create_property_set.actions.creating" /> : <T keyName="create_property_set.actions.create" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePropertySetDialog;
