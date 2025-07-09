import React, { useState, useEffect } from "react";
import { useFindTagsQuery, useCreateTagMutation } from "../generated/types";
import {
  Chip,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Replace makeStyles with styled
import { useSnackbar } from "notistack";
import { T } from "@tolgee/react";

// Replace makeStyles with styled components
const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "2px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(2),
}));

const ChipContainer = styled('div')(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const Explanation = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginRight: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontSize: theme.typography.fontSize,
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const TagView: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error, refetch } = useFindTagsQuery({
    variables: { pageSize: 100 },
  });
  const [createTag] = useCreateTagMutation();
  const [newTagName, setNewTagName] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const SYSTEM_TAGS = [
    "Fachmodell", "Gruppe", "Klasse", "Merkmal", "Masseinheit", "Grösse", 
    "Wert", "Maßeinheit", "Größe", "Datenvorlage", "Merkmalsgruppe", "Referenzdokument"
  ];

  useEffect(() => {
    if (data) {
      setTags(data.findTags.nodes.map((tag) => tag.name));
    }
  }, [data]);

  const handleAddTag = async () => {
    if (!newTagName.trim()) {
      enqueueSnackbar(<T keyName="tag_view.enter_tag_name" />, {
        variant: "error",
      });
      return;
    }

    // Check if it's a system tag
    if (SYSTEM_TAGS.includes(newTagName.trim())) {
      enqueueSnackbar(<T keyName="tag_view.system_tag_error" params={{ tag: newTagName }} />, {
        variant: "error",
      });
      return;
    }

    if (tags.includes(newTagName)) {
      enqueueSnackbar(<T keyName="tag_view.tag_exists" params={{ tag: newTagName }} />, {
        variant: "warning",
      });
      return;
    }

    try {
      await createTag({
        variables: {
          input: {
            name: newTagName,
          },
        },
      });
      enqueueSnackbar(<T keyName="tag_view.tag_added_success" params={{ tag: newTagName }} />, {
        variant: "success",
      });
      setNewTagName("");
      refetch();
    } catch (error) {
      enqueueSnackbar(<T keyName="tag_view.tag_added_error" params={{ tag: newTagName }} />, {
        variant: "error",
      });
      console.error("Fehler beim Hinzufügen des Tags:", error);
    }
  };

  if (loading) {
    return <Typography variant="h6"><T keyName="tag_view.loading" /></Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        <T keyName="tag_view.error_loading" params={{ error: error.message }} />
      </Typography>
    );
  }

  // Sortiere die Tags alphabetisch nach Name
  const sortedTags = data?.findTags.nodes
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        <T keyName="tag_view.heading" />
      </Typography>
      <Explanation variant="body1">
        <T keyName="tag_view.explanation" />
      </Explanation>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="new-tag"
          label={<T keyName="tag_view.new_tag_label" />}
          variant="outlined"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          sx={{ minWidth: 200, marginRight: 2 }}
          error={SYSTEM_TAGS.includes(newTagName.trim()) || tags.includes(newTagName.trim())}
          helperText={
            SYSTEM_TAGS.includes(newTagName.trim()) ? (
              <T keyName="tag_view.system_tag_error" params={{ tag: newTagName }} />
            ) : tags.includes(newTagName.trim()) ? (
              <T keyName="tag_view.tag_exists" params={{ tag: newTagName }} />
            ) : undefined
          }
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleAddTag}
          disabled={
            !newTagName.trim() || 
            SYSTEM_TAGS.includes(newTagName.trim()) || 
            tags.includes(newTagName.trim())
          }
        >
          <T keyName="tag_view.add_tag_button" />
        </StyledButton>
      </StyledForm>
      <ButtonContainer />
      <ChipContainer>
        {sortedTags?.map((tag) => (
          <TagChip key={tag.id} label={tag.name} />
        ))}
      </ChipContainer>
    </Container>
  );
};

export default TagView;
