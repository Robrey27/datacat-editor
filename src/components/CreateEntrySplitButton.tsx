import React, { FC, useState, useEffect } from "react";
import { SimpleRecordType, useCreateEntryMutation } from "../generated/types";
import { ButtonGroup, ButtonGroupProps, Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CreateEntryForm, { CreateEntryFormValues } from "./forms/CreateEntryForm";
import { Maybe } from "graphql/jsutils/Maybe";
import { useSnackbar } from "notistack";
import {
  ClassEntity,
  DocumentEntity,
  Entity,
  GroupEntity,
  MeasureEntity,
  ModelEntity,
  PropertyEntity,
  PropertyGroupEntity,
  UnitEntity,
  ValueEntity,
} from "../domain";
import { T, useTolgee } from "@tolgee/react";
import { useNavigate } from "react-router-dom";

type CreateEntrySplitButtonProps = {
  ButtonGroupProps?: ButtonGroupProps;
};

const options = [
  DocumentEntity,
  ModelEntity,
  GroupEntity,
  ClassEntity,
  PropertyGroupEntity,
  PropertyEntity,
  MeasureEntity,
  UnitEntity,
  ValueEntity,
];

const CreateEntrySplitButton: FC<CreateEntrySplitButtonProps> = (props) => {
  const { ButtonGroupProps } = props;
  const { enqueueSnackbar } = useSnackbar();
  const tolgee = useTolgee();
  const [currentLanguage, setCurrentLanguage] = useState(tolgee.getLanguage());
  const navigate = useNavigate();

  const [create] = useCreateEntryMutation({
    update: (cache) => {
      // Invalidiere alle relevanten Queries
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          hierarchy: (value, { DELETE }) => DELETE,
          search: (value, { DELETE }) => DELETE,
        },
      });
    },
    // Wichtig: Nach erfolgreicher Mutation Query neu ausführen
    refetchQueries: ["PropertyTree"],
    awaitRefetchQueries: false,
  });

  const [lastUsedOption, setLastUsedOption] = React.useState(ClassEntity);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const [input, setInput] = React.useState<Maybe<Entity>>(null);

  const defaultValues: CreateEntryFormValues = {
    id: "",
    name: "",
    description: "",
    versionId: "",
    versionDate: "",
    comment: "",
  };

  const onClick = (tag: Entity) => {
    setMenuOpen(false);
    setLastUsedOption(tag);
    setInput(tag);
    setDialogOpen(true);
  };

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setMenuOpen(false);
  };

  const onSubmit = async ({ id, versionId, versionDate, name, description, comment }: CreateEntryFormValues) => {
    try {
      if (!input) {
        enqueueSnackbar("Fehler: Entity-Typ konnte nicht bestimmt werden", {
          variant: "error"
        });
        return;
      }

      const catalogRecordType = input.recordType as unknown as SimpleRecordType;
      const names = [{ languageTag: "de", value: name }];
      const descriptions = description ? [{ languageTag: "de-DE", value: description }] : [];
      const comments = comment ? [{ languageTag: "de-DE", value: comment }] : [];
      const version = versionId ? { versionId, versionDate } : undefined;
      const properties = {
        id: id || undefined,
        version: version,
        names: names,
        descriptions,
        comments,
      };

      const result = await create({
        variables: {
          input: {
            catalogEntryType: catalogRecordType,
            properties: properties,
            tags: input.tags || [],
          },
        },
      });

      setDialogOpen(false);
      enqueueSnackbar(<T keyName="create_entry_split_button.create_entry" params={{ title: input.title }} />);

      // Cache-Update Signal für andere Komponenten
      localStorage.setItem('datacat-entry-created', Date.now().toString());
      window.dispatchEvent(new CustomEvent('datacat-entry-created', {
        detail: { 
          entryId: result.data?.createCatalogEntry?.catalogEntry?.id,
          entityType: catalogRecordType 
        }
      }));

      // Navigation zum neuen Eintrag
      const newEntryId = result.data?.createCatalogEntry?.catalogEntry?.id;
      if (newEntryId && input) {
        navigate(`/${input.path}/${newEntryId}`);
      }

    } catch (error) {
      enqueueSnackbar("Fehler beim Erstellen des Eintrags", { variant: "error" });
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        color="inherit"
        {...ButtonGroupProps}
        ref={anchorRef}
        aria-label="Eintrag hinzufügen"
      >
        <Button onClick={() => onClick(lastUsedOption)} startIcon={<AddIcon />}>
          {lastUsedOption.title}
        </Button>
        <Button
          color="inherit"
          aria-controls={menuOpen ? "split-button-menu" : undefined}
          aria-expanded={menuOpen ? "true" : undefined}
          aria-label="Zeige weitere Optionen"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.filter((entityType) => entityType !== lastUsedOption).map((option) => (
                    <MenuItem key={option.path} onClick={() => onClick(option)}>
                      {option.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          <T keyName="create_entry_split_button.create_entry" params={{ title: input?.title ?? "" }}>
            {`${input?.title ?? ""} erstellen...`}
          </T>
        </DialogTitle>
        <DialogContent>
          <CreateEntryForm defaultValues={defaultValues} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateEntrySplitButton;

