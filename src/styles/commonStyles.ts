import { styled } from "@mui/material/styles";
import { Paper, Typography, Box, Button, FormControl } from "@mui/material";

// Gemeinsame Container-Styles
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "2px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(2),
}));

// Form-Styles
export const StyledForm = styled('form')(({ theme }) => ({
  "& > *": {
    marginBottom: theme.spacing(1.5),
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginRight: theme.spacing(2),
}));

// Typography-Styles
export const ParagraphTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

// Button-Styles
export const LeftAlignedButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  width: '100%',
  textAlign: 'left',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

// Layout-Styles
export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
}));

export const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});
