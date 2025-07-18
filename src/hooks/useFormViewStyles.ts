import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useFormViewStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        "& > *": {
            marginBottom: theme.spacing(1)
        }
    },
    heading: {
        "& > svg": {
            verticalAlign: "text-bottom"
        }
    },
    addButton: {
        textAlign: "right"
    }
}));

export default useFormViewStyles;
