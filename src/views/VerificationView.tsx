import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, Paper, Typography, Box, Stack } from "@mui/material";
import DomainModelForm from "./forms/DomainModelForm";
import DomainGroupForm from "./forms/DomainGroupForm";
import DomainClassForm from "./forms/DomainClassForm";
import PropertyGroupForm from "./forms/PropertyGroupForm";
import PropertyForm from "./forms/PropertyForm";
import MeasureForm from "./forms/MeasureForm";
import UnitForm from "./forms/UnitForm";
import ValueForm from "./forms/ValueForm";
import ButtonComponent from "@mui/material/Button";
import {
  FindPropGroupWithoutProp,
  FindPropWithoutSubjectOrPropGroup,
  FindModelWithoutGroup,
  FindGroupWithoutSubject,
  FindSubjectWithoutProp,
  FindMeasureWithoutProp,
  FindUnitWithoutMeasure,
  FindValueWithoutMeasure,
  FindMissingEnglishName,
  FindMultipleIDs,
  FindMissingDescription,
  FindMissingEnglishDescription,
  FindMultipleNames,
  FindMultipleNamesAcrossClasses,
} from "../components/Verification";
import {
  ConceptPropsFragment,
  useFindPropGroupWithoutPropTreeQuery,
  useFindPropWithoutSubjectOrPropGroupTreeQuery,
  useFindModelWithoutGroupTreeQuery,
  useFindGroupWithoutSubjectTreeQuery,
  useFindSubjectWithoutPropTreeQuery,
  useFindMeasureWithoutPropTreeQuery,
  useFindUnitWithoutMeasureTreeQuery,
  useFindValueWithoutMeasureTreeQuery,
  useFindMissingEnglishNameTreeQuery,
  useFindMultipleIDsTreeQuery,
  useFindMissingDescriptionTreeQuery,
  useFindMissingEnglishDescriptionTreeQuery,
  useFindMultipleNamesTreeQuery,
  useFindMultipleNamesAcrossClassesTreeQuery,
} from "../generated/types";
import {
  ClassEntity,
  DomainClassIcon,
  DomainGroupIcon,
  DomainModelIcon,
  getEntityType,
  GroupEntity,
  MeasureEntity,
  MeasureIcon,
  ModelEntity,
  PropertyEntity,
  PropertyGroupEntity,
  PropertyGroupIcon,
  PropertyIcon,
  UnitEntity,
  UnitIcon,
  ValueEntity,
  ValueIcon,
} from "../domain";
import { T } from "@tolgee/react";

// Replace makeStyles with styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  overflow: 'auto',
}));

const TreeContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1),
  borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.primary.light}`,
  borderRadius: theme.shape.borderRadius,
}));

const HintTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.grey[600],
  padding: theme.spacing(3),
  alignSelf: 'center',
}));

const HeadlineTypography = styled(Typography)(({ theme }) => ({
  marginBottom: 5,
  marginTop: 5,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LeftAlignBox = styled(Box)({
  textAlign: "left",
});

// Add a styled component for left-aligned buttons
const LeftAlignedButton = styled(ButtonComponent)(({ theme }) => ({
  justifyContent: 'flex-start',
  width: '100%',
  textAlign: 'left',
}));

// Main component without FC type
export function VerificationView() {
  const location = useLocation();
  const [selectButton, setSelectButton] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<ConceptPropsFragment | null>(null);
  const [title, setTitle] = useState<React.ReactNode>("");

  const handleOnSelect = (concept: ConceptPropsFragment) => {
    setSelectedConcept(concept);
  };

  const handleOnDelete = () => {
    setSelectedConcept(null);
  };

  // KORRIGIERT: useEffect mit stabilen dependencies
  useEffect(() => {
    const titleMapping: { [key: string]: React.ReactNode } = {
      "Fachmodelle ohne Gruppe": <T keyName="verification.category.no_model_group">Fachmodelle ohne Gruppe</T>,
      "Gruppen ohne Klasse": <T keyName="verification.category.no_group_class">Gruppen ohne Klasse</T>,
      "Klassen ohne Merkmale/Merkmalsgruppen": <T keyName="verification.category.no_class_properties">Klassen ohne Merkmale/Merkmalsgruppen</T>,
      "Merkmalsgruppen ohne Merkmale": <T keyName="verification.category.no_property_group">Merkmalsgruppen ohne Merkmale</T>,
      "Merkmale ohne Klasse oder Merkmalsgruppe": <T keyName="verification.category.no_property">Merkmale ohne Klasse oder Merkmalsgruppe</T>,
      "Größen die keinem Merkmal zugeordnet sind": <T keyName="verification.category.no_measure">Größen ohne Merkmal</T>,
      "Einheiten ohne Größe": <T keyName="verification.category.no_unit">Einheiten ohne Größe</T>,
      "Werte ohne Größe": <T keyName="verification.category.no_value">Werte ohne Größe</T>,
      "ID-Duplikate": <T keyName="verification.category.duplicate_id">ID-Duplikate</T>,
      "Namen-Duplikate (innerhalb eines Types)": <T keyName="verification.category.duplicate_name_type">Namen-Duplikate (innerhalb eines Types)</T>,
      "Namen-Duplikate (gesamter Datenbestand)": <T keyName="verification.category.duplicate_name_all">Namen-Duplikate (gesamter Datenbestand)</T>,
      "Fehlende Beschreibung": <T keyName="verification.category.missing_description">Fehlende Beschreibung</T>,
      "Fehlende Beschreibung (englisch)": <T keyName="verification.category.missing_description_en">Fehlende Beschreibung (englisch)</T>,
      "Fehlende Namens-Übersetzung (englisch)": <T keyName="verification.category.missing_translation_en">Fehlende Namens-Übersetzung (englisch)</T>
    };
    
    setTitle(titleMapping[selectCategory] || "");
  }, [selectCategory]); // Nur selectCategory als dependency

  // Left column: Criteria selection
  const renderCriteriaButtons = () => (
    <StyledPaper>
      <Typography variant="h6">
        <T keyName="verification.title">Prüfkriterium</T>
      </Typography>
      <Stack direction="column" spacing={1} alignItems="stretch">
        <LeftAlignedButton onClick={() => setSelectButton("Integrität")}>
          <T keyName="verification.criteria.integrity">Integrität</T>
        </LeftAlignedButton>
        <LeftAlignedButton onClick={() => setSelectButton("Eindeutigkeit")}>
          <T keyName="verification.criteria.uniqueness">Eindeutigkeit</T>
        </LeftAlignedButton>
        <LeftAlignedButton onClick={() => setSelectButton("Sprache")}>
          <T keyName="verification.criteria.language">Sprache</T>
        </LeftAlignedButton>
      </Stack>
      
      <Typography variant="h6" sx={{ mt: 2 }}>
        <T keyName="verification.category_title">Kategorie</T>
      </Typography>
      <Stack direction="column" spacing={1} alignItems="stretch">
        {renderCategoryButtons()}
      </Stack>
    </StyledPaper>
  );

  // Category buttons
  const renderCategoryButtons = () => {
    switch (selectButton) {
      case "Integrität":
        return (
          <>
            <LeftAlignedButton onClick={() => setSelectCategory("Fachmodelle ohne Gruppe")}>
              <T keyName="verification.category.no_model_group">Fachmodelle ohne Gruppe</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Gruppen ohne Klasse")}>
              <T keyName="verification.category.no_group_class">Gruppen ohne Klasse</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Klassen ohne Merkmale/Merkmalsgruppen")}>
              <T keyName="verification.category.no_class_properties">Klassen ohne Merkmale/Merkmalsgruppen</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Merkmalsgruppen ohne Merkmale")}>
              <T keyName="verification.category.no_property_group">Merkmalsgruppen ohne Merkmale</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Merkmale ohne Klasse oder Merkmalsgruppe")}>
              <T keyName="verification.category.no_property">Merkmale ohne Klasse oder Merkmalsgruppe</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Größen die keinem Merkmal zugeordnet sind")}>
              <T keyName="verification.category.no_measure">Größen ohne Merkmal</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Einheiten ohne Größe")}>
              <T keyName="verification.category.no_unit">Einheiten ohne Größe</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Werte ohne Größe")}>
              <T keyName="verification.category.no_value">Werte ohne Größe</T>
            </LeftAlignedButton>
          </>
        );
      case "Eindeutigkeit":
        return (
          <>
            <LeftAlignedButton onClick={() => setSelectCategory("ID-Duplikate")}>
              <T keyName="verification.category.duplicate_id">ID-Duplikate</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Namen-Duplikate (innerhalb eines Types)")}>
              <T keyName="verification.category.duplicate_name_type">Namen-Duplikate (innerhalb eines Types)</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Namen-Duplikate (gesamter Datenbestand)")}>
              <T keyName="verification.category.duplicate_name_all">Namen-Duplikate (gesamter Datenbestand)</T>
            </LeftAlignedButton>
          </>
        );
      case "Sprache":
        return (
          <>
            <LeftAlignedButton onClick={() => setSelectCategory("Fehlende Beschreibung")}>
              <T keyName="verification.category.missing_description">Fehlende Beschreibung</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Fehlende Beschreibung (englisch)")}>
              <T keyName="verification.category.missing_description_en">Fehlende Beschreibung (englisch)</T>
            </LeftAlignedButton>
            <LeftAlignedButton onClick={() => setSelectCategory("Fehlende Namens-Übersetzung (englisch)")}>
              <T keyName="verification.category.missing_translation_en">Fehlende Namens-Übersetzung (englisch)</T>
            </LeftAlignedButton>
          </>
        );
      default:
        return null;
    }
  };

  // Middle column: Result list
  const renderResultList = () => {
    switch (selectCategory) {
      case "Fachmodelle ohne Gruppe":
        return <ThisFindModelWithoutGroup />;
      case "Gruppen ohne Klasse":
        return <ThisFindGroupWithoutSubject />;
      case "Klassen ohne Merkmale/Merkmalsgruppen":
        return <ThisFindSubjectWithoutProp />;
      case "Merkmalsgruppen ohne Merkmale":
        return <ThisFindPropGroupWithoutProp />;
      case "Merkmale ohne Klasse oder Merkmalsgruppe":
        return <ThisFindPropWithoutSubjectOrPropGroup />;
      case "Größen die keinem Merkmal zugeordnet sind":
        return <ThisFindMeasureWithoutProp />;
      case "Einheiten ohne Größe":
        return <ThisFindUnitWithoutMeasure />;
      case "Werte ohne Größe":
        return <ThisFindValueWithoutMeasure />;
      case "ID-Duplikate":
        return <ThisFindMultipleIDs />;
      case "Namen-Duplikate (innerhalb eines Types)":
        return <ThisFindMultipleNames />;
      case "Namen-Duplikate (gesamter Datenbestand)":
        return <ThisFindMultipleNamesAcrossClasses />;
      case "Fehlende Beschreibung":
        return <ThisFindMissingDescription />;
      case "Fehlende Beschreibung (englisch)":
        return <ThisFindMissingEnglishDescription />;
      case "Fehlende Namens-Übersetzung (englisch)":
        return <ThisFindMissingEnglishName />;
      default:
        return (
          <StyledPaper>
            <HintTypography variant="body1">
              <T keyName="verification.result.select_criteria">Prüfkriterium und Kategorie auswählen.</T>
            </HintTypography>
          </StyledPaper>
        );
    }
  };

  // Right column: Detail view
  const renderDetailView = () => {
    if (!selectedConcept) {
      return (
        <HintTypography variant="body1">
          <T keyName="verification.result.select_entry">Prüfergebnis in der Listenansicht auswählen um Eigenschaften anzuzeigen.</T>
        </HintTypography>
      );
    }
    const { id, recordType, tags } = selectedConcept;
    const entityType = getEntityType(recordType, tags.map((x) => x.id));
    switch (entityType?.path) {
      case GroupEntity.path:
        return (
          <>
            <Typography variant="h5">
              <DomainGroupIcon /> Gruppe bearbeiten
            </Typography>
            <DomainGroupForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
      case ClassEntity.path:
        return (
          <>
            <Typography variant="h5">
              <DomainClassIcon /> Klasse bearbeiten
            </Typography>
            <DomainClassForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
      case PropertyEntity.path:
        return (
          <>
            <Typography variant="h5">
              <PropertyIcon /> Merkmal bearbeiten
            </Typography>
            <PropertyForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
      case MeasureEntity.path:
        return (
          <>
            <Typography variant="h5">
              <MeasureIcon /> Größe bearbeiten
            </Typography>
            <MeasureForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
      case UnitEntity.path:
        return (
          <>
            <Typography variant="h5">
              <UnitIcon /> Einheit bearbeiten
            </Typography>
            <UnitForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
      case ValueEntity.path:
        return (
          <>
            <Typography variant="h5">
              <ValueIcon /> Wert bearbeiten
            </Typography>
            <ValueForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
      default:
        return (
          <>
            <Typography variant="h5">
              <DomainModelIcon /> Fachmodell bearbeiten
            </Typography>
            <DomainModelForm id={id} onDelete={() => setSelectedConcept(null)} />
          </>
        );
    }
  };

  // Components for verification queries
  function ThisFindPropGroupWithoutProp() {
    const { loading, error, data } = useFindPropGroupWithoutPropTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findPropGroupWithoutProp.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_property_groups_have_properties">Alle Merkmalsgruppen haben mindestens ein Merkmal zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindPropGroupWithoutProp
        leaves={data!.findPropGroupWithoutProp.nodes}
        paths={data!.findPropGroupWithoutProp.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindPropWithoutSubjectOrPropGroup() {
    const { loading, error, data } = useFindPropWithoutSubjectOrPropGroupTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findPropWithoutSubjectOrPropGroup.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_properties_have_parent">Alle Merkmale sind einer Klasse oder Merkmalsgruppe zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindPropWithoutSubjectOrPropGroup
        leaves={data!.findPropWithoutSubjectOrPropGroup.nodes}
        paths={data!.findPropWithoutSubjectOrPropGroup.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindModelWithoutGroup() {
    const { loading, error, data } = useFindModelWithoutGroupTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findModelWithoutGroup.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_models_have_groups">Alle Fachmodelle haben mindestens eine Gruppe zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindModelWithoutGroup
        leaves={data!.findModelWithoutGroup.nodes}
        paths={data!.findModelWithoutGroup.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindGroupWithoutSubject() {
    const { loading, error, data } = useFindGroupWithoutSubjectTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findGroupWithoutSubject.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_groups_have_classes">Alle Gruppen haben mindestens eine Klasse zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindGroupWithoutSubject
        leaves={data!.findGroupWithoutSubject.nodes}
        paths={data!.findGroupWithoutSubject.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindSubjectWithoutProp() {
    const { loading, error, data } = useFindSubjectWithoutPropTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findSubjectWithoutProp.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_classes_have_properties">Alle Klassen haben mindestens ein Merkmal oder eine Merkmalsgruppe zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindSubjectWithoutProp
        leaves={data!.findSubjectWithoutProp.nodes}
        paths={data!.findSubjectWithoutProp.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMeasureWithoutProp() {
    const { loading, error, data } = useFindMeasureWithoutPropTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMeasureWithoutProp.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_measures_have_properties">Alle Größen sind mindestens einem Merkmal zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMeasureWithoutProp
        leaves={data!.findMeasureWithoutProp.nodes}
        paths={data!.findMeasureWithoutProp.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindUnitWithoutMeasure() {
    const { loading, error, data } = useFindUnitWithoutMeasureTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findUnitWithoutMeasure.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_units_have_measures">Alle Einheiten sind einer Größe zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindUnitWithoutMeasure
        leaves={data!.findUnitWithoutMeasure.nodes}
        paths={data!.findUnitWithoutMeasure.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindValueWithoutMeasure() {
    const { loading, error, data } = useFindValueWithoutMeasureTreeQuery({});
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findValueWithoutMeasure.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_values_have_measures">Alle Werte sind einer Größe zugeordnet.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindValueWithoutMeasure
        leaves={data!.findValueWithoutMeasure.nodes}
        paths={data!.findValueWithoutMeasure.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMissingEnglishName() {
    const { loading, error, data } = useFindMissingEnglishNameTreeQuery({
        variables: { 
            input: { 
                nodeTypeFilter: {
                    catalogEntryTypeIn: []
                }
            } 
        }
    });
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMissingEnglishName.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_have_english_translation">Alle Elemente haben englische Namensübersetzungen.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMissingEnglishName
        leaves={data!.findMissingEnglishName.nodes}
        paths={data!.findMissingEnglishName.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMultipleIDs() {
    const { loading, error, data } = useFindMultipleIDsTreeQuery({
        variables: { 
            input: { 
                nodeTypeFilter: {
                    catalogEntryTypeIn: []
                }
            } 
        }
    });
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMultipleIDs.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_ids_unique">Alle IDs sind eindeutig - keine Duplikate vorhanden.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMultipleIDs
        leaves={data!.findMultipleIDs.nodes}
        paths={data!.findMultipleIDs.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMissingDescription() {
    const { loading, error, data } = useFindMissingDescriptionTreeQuery({
        variables: { 
            input: { 
                nodeTypeFilter: {
                    catalogEntryTypeIn: []
                }
            } 
        }
    });
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMissingDescription.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_have_description">Alle Elemente haben eine Beschreibung.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMissingDescription
        leaves={data!.findMissingDescription.nodes}
        paths={data!.findMissingDescription.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMissingEnglishDescription() {
    const { loading, error, data } = useFindMissingEnglishDescriptionTreeQuery({
        variables: { 
            input: { 
                nodeTypeFilter: {
                    catalogEntryTypeIn: []
                }
            } 
        }
    });
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMissingEnglishDescription.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_have_english_description">Alle Elemente haben englische Beschreibungen.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMissingEnglishDescription
        leaves={data!.findMissingEnglishDescription.nodes}
        paths={data!.findMissingEnglishDescription.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMultipleNames() {
    const { loading, error, data } = useFindMultipleNamesTreeQuery({
        variables: { 
            input: { 
                nodeTypeFilter: {
                    catalogEntryTypeIn: []
                }
            } 
        }
    });
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMultipleNames.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_names_unique_per_type">Alle Namen sind innerhalb ihres Typs eindeutig.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMultipleNames
        leaves={data!.findMultipleNames.nodes}
        paths={data!.findMultipleNames.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  function ThisFindMultipleNamesAcrossClasses() {
    const { loading, error, data } = useFindMultipleNamesAcrossClassesTreeQuery({
        variables: { 
            input: { 
                nodeTypeFilter: {
                    catalogEntryTypeIn: []
                }
            } 
        }
    });
    if (loading) return <LinearProgress />;
    if (error) return <p>Fehler beim Aufrufen der Prüfroutine.</p>;
    
    // Check if no results found
    if (data && data.findMultipleNamesAcrossClasses.nodes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
            ✓ <T keyName="verification.result.no_issues_found">Keine Probleme gefunden</T>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <T keyName="verification.result.success_messages.all_names_unique_globally">Alle Namen sind im gesamten Datenbestand eindeutig.</T>
          </Typography>
        </Box>
      );
    }
    
    return (
      <FindMultipleNamesAcrossClasses
        leaves={data!.findMultipleNamesAcrossClasses.nodes}
        paths={data!.findMultipleNamesAcrossClasses.paths}
        onSelect={handleOnSelect}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 2 }}>
      {/* Left column - Criteria */}
      <Box sx={{ 
        width: '250px', 
        flexShrink: 0,
        alignSelf: 'flex-start'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          <T keyName="verification.title">Prüfkriterium</T>
        </Typography>
        {renderCriteriaButtons()}
      </Box>
      
      {/* Middle column - Results */}
      <Box sx={{ 
        width: '350px', 
        flexShrink: 0,
        alignSelf: 'flex-start'
      }}>
        <StyledPaper>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ 
            flexGrow: title ? 1 : 0, 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            {renderResultList()}
          </Box>
        </StyledPaper>
      </Box>
      
      {/* Right column - Details */}
      <Box sx={{ 
        flexGrow: 1,
        alignSelf: 'flex-start',
        minHeight: !selectedConcept ? 'auto' : undefined
      }}>
        <StyledPaper>
          {renderDetailView()}
        </StyledPaper>
      </Box>
    </Box>
  );
}

export default VerificationView;
