import * as React from "react";
import { FunctionComponent } from "react";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import makeStyles from "@mui/styles/makeStyles";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CodeIcon from "@mui/icons-material/Code";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishIcon from "@mui/icons-material/Publish";
import {
  ClassEntity,
  DataTemplateEntity,
  DocumentEntity,
  GroupEntity,
  MeasureEntity,
  ModelEntity,
  PropertyEntity,
  PropertyGroupEntity,
  UnitEntity,
  ValueEntity,
} from "../domain";
import AppTitle from "./AppTitle";
import { useAdminAccess } from "../hooks/useAuthContext";

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    overflow: "auto",
  },
  heading: {
    padding: theme.spacing(2),
  },
}));

type AppDrawerItemProps = {
  icon?: React.ReactNode;
  primary: string;
  secondary?: string;
  tooltip?: string;
  to: string;
  onClick: () => void;
};

export const AppDrawerItem: FunctionComponent<
  AppDrawerItemProps & ListItemProps
> = (props) => {
  const {
    icon,
    primary,
    secondary,
    tooltip = "",
    to,
    disabled,
    onClick,
  } = props;

  return (
    <Tooltip title={tooltip} aria-label={tooltip} arrow enterDelay={500}>
      <ListItem
        button
        component={RouterLink}
        to={to}
        disabled={disabled}
        onClick={onClick}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText inset={!icon} primary={primary} secondary={secondary} />
      </ListItem>
    </Tooltip>
  );
};

const AppDrawer: FunctionComponent<DrawerProps> = (props) => {
  const classes = useStyles();
  const isAdmin = useAdminAccess();
  const { onClose } = props;

  const handleItemClick = () => {
    if (onClose) {
      onClose({}, "backdropClick");
    }
  };

  return (
    <Drawer {...props}>
      <div className={classes.drawerContainer}>
        <div className={classes.heading}>
          <AppTitle />
        </div>

        <List dense>
          <ListSubheader disableSticky>Allgemein</ListSubheader>

          <AppDrawerItem
            icon={<HomeIcon />}
            primary="Startseite"
            to="/"
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<AccountCircleIcon />}
            primary="Profil bearbeiten"
            to="/profile"
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<SearchIcon />}
            primary="Katalog durchsuchen"
            to="/search"
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<ChecklistIcon />}
            primary="Prüfen"
            to="/audit"
            onClick={handleItemClick}
          />
          {isAdmin && (
            <AppDrawerItem
              icon={<PublishIcon />}
              primary="Importieren"
              to="/import"
              onClick={handleItemClick}
            />
          )}

          <AppDrawerItem
            icon={<FileDownloadIcon />}
            primary="Exportieren"
            to="/export"
            onClick={handleItemClick}
          />

          {isAdmin && (
            <AppDrawerItem
              icon={<CodeIcon />}
              primary="GraphiQL Interface"
              to="/graphiql"
              onClick={handleItemClick}
            />
          )}

          {isAdmin && (
            <AppDrawerItem
              icon={<LocalOfferIcon />}
              primary="Neue Tags anlegen"
              to="/tagview"
              onClick={handleItemClick}
            />
          )}

          <AppDrawerItem
            icon={<StorageIcon />}
            primary="Tabellenansicht"
            to="/gridview"
            onClick={handleItemClick}
          />

          <ListSubheader disableSticky>Katalog</ListSubheader>

          <AppDrawerItem
            icon={<DocumentEntity.Icon />}
            primary={DocumentEntity.titlePlural}
            to={`/${DocumentEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<ModelEntity.Icon />}
            primary={ModelEntity.titlePlural}
            to={`/${ModelEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<GroupEntity.Icon />}
            primary={GroupEntity.titlePlural}
            to={`/${GroupEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<ClassEntity.Icon />}
            primary={ClassEntity.titlePlural}
            to={`/${ClassEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<DataTemplateEntity.Icon />}
            primary={DataTemplateEntity.titlePlural}
            to={`/${DataTemplateEntity.path}`}
            disabled
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<PropertyGroupEntity.Icon />}
            primary={PropertyGroupEntity.titlePlural}
            to={`/${PropertyGroupEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<PropertyEntity.Icon />}
            primary={PropertyEntity.titlePlural}
            to={`/${PropertyEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<MeasureEntity.Icon />}
            primary={MeasureEntity.titlePlural}
            to={`/${MeasureEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<UnitEntity.Icon />}
            primary={UnitEntity.titlePlural}
            to={`/${UnitEntity.path}`}
            onClick={handleItemClick}
          />

          <AppDrawerItem
            icon={<BookmarksIcon />}
            primary={ValueEntity.titlePlural}
            to={`/${ValueEntity.path}`}
            onClick={handleItemClick}
          />
        </List>
      </div>
    </Drawer>
  );
};

export default AppDrawer;
