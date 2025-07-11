import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    usePropertyTreeQuery,
    useGetBagLazyQuery,
    useAddTagMutation,
    useFindTagsQuery,
} from "../generated/types";
import {
    Box,
    Chip,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    Typography,
    Checkbox,
    SelectChangeEvent,
    LinearProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { T, useTranslate } from "@tolgee/react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { ButtonContainer } from "../styles/commonStyles";
import LoadingSpinner from "../components/LoadingSpinner";

// Memoized constants außerhalb der Komponente
const EXCLUDED_TAGS = [
    "Fachmodell", "Gruppe", "Klasse", "Merkmal", "Masseinheit", "Grösse",
    "Wert", "Maßeinheit", "Größe", "Datenvorlage", "Merkmalsgruppe", "Referenzdokument"
] as const;

// Haupt-Tags und Zuordnung zu Spalten
const MAIN_TAGS: { [key: string]: string } = {
    "992c8887-301e-4764-891c-ae954426fc22": "document",        // Referenzdokument
    "6f96aaa7-e08f-49bb-ac63-93061d4c5db2": "model",           // Fachmodell
    "5997da9b-a716-45ae-84a9-e2a7d186bcf9": "group",           // Gruppe
    "e9b2cd6d-76f7-4c55-96ab-12d084d21e96": "class",           // Klasse
    "d4b0ba83-eb40-4997-85e0-9d6181e85639": "property",        // Merkmal
    "a27c8e3c-5fd1-47c9-806a-6ded070efae8": "propertyGroup",   // Merkmalsgruppe
};

const TAG_TO_COLUMN: { [key: string]: keyof VisibleColumns } = {
    "992c8887-301e-4764-891c-ae954426fc22": "document",
    "6f96aaa7-e08f-49bb-ac63-93061d4c5db2": "model",
    "5997da9b-a716-45ae-84a9-e2a7d186bcf9": "group",
    "e9b2cd6d-76f7-4c55-96ab-12d084d21e96": "class",
    "d4b0ba83-eb40-4997-85e0-9d6181e85639": "property",
    "a27c8e3c-5fd1-47c9-806a-6ded070efae8": "propertyGroup",
};

// Replace makeStyles with styled components
const TableContainer = styled(Paper)(({ theme }) => ({
    border: "2px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: theme.spacing(2),
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    height: "calc(100vh - 100px)",
    display: "flex",
    flexDirection: "column",
}));

const FixedContainer = styled(Box)(({ theme }) => ({
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
    padding: theme.spacing(2),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
}));

const TagButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
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

const TagControls = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 200,
    marginRight: theme.spacing(2),
}));

interface VisibleColumns {
    document: boolean;
    model: boolean;
    group: boolean;
    class: boolean;
    property: boolean;
    propertyGroup: boolean;
}

// Extracted and memoized tag component for better performance
const MemoizedTagChip = memo(
    ({
        tag,
        selectedTag,
        onTagClick,
    }: {
        tag: string;
        selectedTag: string | null;
        onTagClick: (tag: string | null) => void;
    }) => (
        <TagChip
            key={tag}
            label={tag}
            clickable
            color={selectedTag === tag ? "secondary" : "default"}
            onClick={() => onTagClick(tag)}
        />
    )
);

// Extracted TagFilterSection component for better organization
const TagFilterSection = memo(({
    allTags,
    selectedTag,
    handleTagFilter,
    newTag,
    handleTagChange,
    handleAddTag,
    t,
}: {
    allTags: string[];
    selectedTag: string | null;
    handleTagFilter: (tag: string | null) => void;
    newTag: string;
    handleTagChange: (event: SelectChangeEvent<string>) => void;
    handleAddTag: () => void;
    t: any;
}) => (
    <>
        <HeaderContainer>
            <Typography variant="h6">{t("grid_view.tag_filter_title")}</Typography>
            <TagControls>
                <StyledFormControl variant="outlined">
                    <InputLabel id="importTag-label">
                        {t("grid_view.tag_filter_placeholder")}
                    </InputLabel>
                    <Select
                        labelId="importTag-label"
                        id="importTag"
                        label={t("grid_view.tag_filter_placeholder")}
                        name="importTag"
                        value={newTag}
                        onChange={handleTagChange}
                        style={{ minWidth: "200px" }}
                    >
                        <MenuItem value="">
                            <em>{t("grid_view.select_tag")}</em>
                        </MenuItem>
                        {allTags.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTag}
                    startIcon={<LocalOfferIcon />}
                    disabled={!newTag}
                >
                    {t("grid_view.add_tag")}
                </Button>
            </TagControls>
        </HeaderContainer>

        <TagButtonContainer>
            {allTags.map((tag) => (
                <MemoizedTagChip
                    key={tag}
                    tag={tag}
                    selectedTag={selectedTag}
                    onTagClick={handleTagFilter}
                />
            ))}
            <TagChip
                label={t("grid_view.show_all")}
                clickable
                color={selectedTag === null ? "secondary" : "default"}
                onClick={() => handleTagFilter(null)}
            />
        </TagButtonContainer>
    </>
));

// Main component
const GridViewView = () => {
    const navigate = useNavigate();
    const {
        loading: propertyTreeLoading,
        error: propertyTreeError,
        data: propertyTreeData,
    } = usePropertyTreeQuery({
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true
    });
    const [getBag, { error: bagError }] = useGetBagLazyQuery();
    const [addTag] = useAddTagMutation();

    const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
        document: true,
        model: true,
        group: true,
        class: true,
        property: true,
        propertyGroup: true,
    });

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [documentNames, setDocumentNames] = useState<{
        [key: string]: { name: string | null; id: string | null };
    }>({});
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isTagging, setIsTagging] = useState(false);

    const { data, refetch } = useFindTagsQuery({ variables: { pageSize: 100 } });
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslate();

    // --- Nur noch propertyTreeData verwenden ---
    const nodes = propertyTreeData?.hierarchy?.nodes || [];
    const paths = propertyTreeData?.hierarchy?.paths || [];

    // Memoized filter function
    const filterTags = useCallback((tags: string[]) =>
        tags.filter((tag) => !EXCLUDED_TAGS.includes(tag as any)), []
    );

    // Column visibility handlers
    const handleCheckboxChange = useCallback((column: keyof VisibleColumns) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    }, []);

    const handleShowOnlyColumn = useCallback((column: keyof VisibleColumns) => {
        setVisibleColumns({
            document: false,
            model: false,
            group: false,
            class: false,
            property: false,
            propertyGroup: false,
            [column]: true,
        });
    }, []);

    const handleShowAllColumns = useCallback(() => {
        setVisibleColumns({
            document: true,
            model: true,
            group: true,
            class: true,
            property: true,
            propertyGroup: true,
        });
    }, []);

    // Tag filtering
    const handleTagFilter = useCallback((tag: string | null) => {
        setSelectedTag(tag);
    }, []);

    const handleTagChange = useCallback((event: SelectChangeEvent<string>) => {
        setNewTag(event.target.value as string);
    }, []);

    // Row mapping functions - KORRIGIERT: Alle Tags prüfen
    const mapRecordTypeToColumn = useCallback((node: any, column: string) => {
        const tags = node.tags || [];
        switch (column) {
            case "document":
                // Prüfe sowohl Tags als auch recordType
                if (node.recordType === "ExternalDocument") return node.name || "";
                for (const tag of tags) {
                    if (tag.id === "992c8887-301e-4764-891c-ae954426fc22") {
                        return node.name || "";
                    }
                }
                return "";
            case "model":
                // Prüfe Tags für Fachmodell
                for (const tag of tags) {
                    if (tag.id === "6f96aaa7-e08f-49bb-ac63-93061d4c5db2") {
                        return node.name || "";
                    }
                }
                return "";
            case "group":
                // Prüfe Tags für Gruppe
                for (const tag of tags) {
                    if (tag.id === "5997da9b-a716-45ae-84a9-e2a7d186bcf9") {
                        return node.name || "";
                    }
                }
                return "";
            case "class":
                // Prüfe sowohl recordType als auch Tags
                if (node.recordType === "Subject") return node.name || "";
                for (const tag of tags) {
                    if (tag.id === "e9b2cd6d-76f7-4c55-96ab-12d084d21e96") {
                        return node.name || "";
                    }
                }
                return "";
            case "property":
                // Prüfe sowohl recordType als auch Tags
                if (node.recordType === "Property") return node.name || "";
                for (const tag of tags) {
                    if (tag.id === "d4b0ba83-eb40-4997-85e0-9d6181e85639") {
                        return node.name || "";
                    }
                }
                return "";
            case "propertyGroup":
                // Prüfe sowohl recordType als auch Tags
                if (node.recordType === "Nest") return node.name || "";
                for (const tag of tags) {
                    if (tag.id === "a27c8e3c-5fd1-47c9-806a-6ded070efae8") {
                        return node.name || "";
                    }
                }
                return "";
            default:
                return "";
        }
    }, []);

    // Navigation handler
    const handleOnSelect = useCallback((id: string, column: string) => {
        let entityTypePath = "";
        switch (column) {
            case "document":
                entityTypePath = "document";
                break;
            case "model":
                entityTypePath = "model";
                break;
            case "group":
                entityTypePath = "group";
                break;
            case "class":
                entityTypePath = "class";
                break;
            case "property":
                entityTypePath = "property";
                break;
            case "propertyGroup":
                entityTypePath = "property-group";
                break;
            default:
                return;
        }
        const newUrl = `/${entityTypePath}/${id}`;
        navigate(newUrl);
        window.location.reload();
    }, [navigate]);

    // Build data rows: Erzeugt die Zeilen für die DataGrid-Tabelle anhand der Hierarchiepfade
    const buildRows = useCallback(() => {
        const rows: any[] = [];
        const seenCombinations = new Set();

        // Für jeden Pfad eine Zeile erzeugen
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const row: any = {
                document: "",
                model: "",
                group: "",
                class: "",
                property: "",
                propertyGroup: "",
                ids: {
                    document: "",
                    model: "",
                    group: "",
                    class: "",
                    property: "",
                    propertyGroup: "",
                },
                recordType: "",
                tags: [],
                uniqueId: `path-${i}`,
            };

            for (let j = 0; j < path.length; j++) {
                const id = path[j];
                const node = nodes.find((node) => node.id === id);
                if (node) {
                    for (const column of ["document", "model", "group", "class", "property", "propertyGroup"] as (keyof VisibleColumns)[]) {
                        const value = mapRecordTypeToColumn(node, column);
                        if (value) {
                            row[column] = value;
                            row.ids[column] = node.id;
                        }
                    }
                    row.recordType = node.recordType;
                    row.tags = node.tags;
                }
            }

            const combinationKey = `${row.document}-${row.model}-${row.group}-${row.class}-${row.property}-${row.propertyGroup}`;
            if (!seenCombinations.has(combinationKey)) {
                seenCombinations.add(combinationKey);
                rows.push(row);
            }
        }

        // Sortiere die Zeilen für eine konsistente Anzeige
        rows.sort((a, b) => {
            if (a.document !== b.document)
                return a.document.localeCompare(b.document);
            if (a.model !== b.model) return a.model.localeCompare(b.model);
            if (a.group !== b.group) return a.group.localeCompare(b.group);
            if (a.class !== b.class) return a.class.localeCompare(b.class);
            if (a.propertyGroup !== b.propertyGroup)
                return a.propertyGroup.localeCompare(b.propertyGroup);
            return a.property.localeCompare(b.property);
        });

        return rows;
    }, [paths, nodes, mapRecordTypeToColumn]);

    // Filtered rows und entityCount in einem useMemo
    const { filteredRows, entityCount, modelIds } = useMemo(() => {
        let rows = buildRows();

        // Tag-Filter performant mit Set
        if (selectedTag) {
            const tagSet = new Set([selectedTag]);
            rows = rows.filter((row) =>
                row.tags.some((tag: any) => tagSet.has(tag.name))
            );
        }

        // Sichtbare Spalten
        const visibleColumnsArray = Object.keys(visibleColumns).filter(
            (key) => visibleColumns[key as keyof VisibleColumns]
        );

        let count: number | null = null;
        if (visibleColumnsArray.length === 1) {
            const column = visibleColumnsArray[0];
            const uniqueValues = new Set<string>();

            rows = rows.filter((row) => {
                const value = row[column];
                if (uniqueValues.has(value)) {
                    return false;
                }
                uniqueValues.add(value);
                return true;
            });

            count = uniqueValues.size;
        }

        // Modell-IDs für Dokumentnamen extrahieren
        const modelIds = Array.from(
            new Set(
                rows.map((row) => row.ids.model).filter((id: string) => id)
            )
        );

        return { filteredRows: rows, entityCount: count, modelIds };
    }, [visibleColumns, selectedTag, buildRows]);

    // Tag-Query nur einmalig und bei Änderungen der Tags
    useEffect(() => {
        if (data) {
            setTags(data.findTags.nodes.map((tag) => tag.name));
        }
    }, [data]);

    // Dokumentnamen nur nachladen, wenn sich modelIds ändern
    useEffect(() => {
        if (modelIds.length === 0) return;
        let isMounted = true;
        const fetchDocumentNames = async () => {
            const newDocumentData: {
                [key: string]: { name: string | null; id: string | null };
            } = {};

            for (const id of modelIds) {
                if (!documentNames[id]) {
                    try {
                        const response = await getBag({ variables: { id } });
                        const documentNode =
                          response.data?.getBag?.documentedBy?.nodes[0]?.relatingDocument;
                        const documentName = documentNode?.name || null;
                        const documentId = documentNode?.id || null;
                        newDocumentData[id] = { name: documentName, id: documentId };
                    } catch {
                        // Fehler beim Laden ignorieren
                    }
                }
            }

            if (isMounted && Object.keys(newDocumentData).length > 0) {
                setDocumentNames(prev => ({ ...prev, ...newDocumentData }));
            }
        };

        fetchDocumentNames();
        return () => { isMounted = false; };
    }, [modelIds, getBag, documentNames]);

    // Enhanced tag adding functionality with improved tag checking
    const handleAddTag = useCallback(async () => {
        if (!newTag) {
            enqueueSnackbar(t("grid_view.please_select_tag"), { variant: "error" });
            return;
        }
        if (selectedRows.length === 0) {
            enqueueSnackbar(t("grid_view.please_select_rows"), {
                variant: "warning",
            });
            return;
        }

        setIsTagging(true);
        enqueueSnackbar(t("grid_view.adding_tags"), { variant: "info" });

        // Frische Daten ermitteln, damit lokale row.tags aktuell sind
        try {
            await refetch();
        } catch {
            enqueueSnackbar(t("grid_view.error_fetching_latest_tags"), {
                variant: "warning",
            });
        }

        // Tag-ID ermitteln
        const selectedTagObj = data?.findTags.nodes.find(
            (tag) => tag.name === newTag
        );
        const tagId = selectedTagObj?.id;
        if (!tagId) {
            enqueueSnackbar(t("grid_view.tag_id_not_found"), { variant: "error" });
            setIsTagging(false);
            return;
        }

        // Ausgewählte Zeilen filtern
        const selectedRowSet = new Set(selectedRows);
        const entries = filteredRows.filter((row) =>
            selectedRowSet.has(String(row.uniqueId))
        );

        // Map für eindeutige Katalog-Einträge
        const catalogMap = new Map<string, { already: boolean }>();

        // Prüfen, ob jeder Eintrag das Tag schon besitzt
        entries.forEach((row) => {
            Object.values(row.ids).forEach((entryId: any) => {
                if (!entryId) return;
                if (!catalogMap.has(entryId)) {
                    const hasTag =
                        Array.isArray(row.tags) &&
                        row.tags.some((tg: any) => tg.id === tagId);
                    catalogMap.set(entryId, { already: hasTag });
                }
            });
        });

        let toAdd = 0,
            alreadyCount = 0;
        catalogMap.forEach((v) => (v.already ? alreadyCount++ : toAdd++));

        // Falls nichts hinzuzufügen ist
        if (toAdd === 0) {
            setIsTagging(false);
            enqueueSnackbar(
                alreadyCount > 0
                    ? t("grid_view.all_entries_already_tagged", { count: alreadyCount })
                    : t("grid_view.no_tags_to_add"),
                { variant: alreadyCount > 0 ? "info" : "warning" }
            );
            return;
        }

        // Tags hinzufügen
        let added = 0,
            failed = 0;
        for (const [entryId, status] of catalogMap.entries()) {
            if (status.already) continue;
            try {
                await addTag({
                    variables: { input: { catalogEntryId: entryId, tagId } },
                });
                added++;

                // Zeilen-Tags lokal aktualisieren
                entries.forEach((row) => {
                    Object.values(row.ids).forEach((id: any) => {
                        if (id === entryId) {
                            row.tags = Array.isArray(row.tags)
                                ? [
                                    ...row.tags,
                                    {
                                        id: tagId,
                                        name: newTag,
                                        catalogEntryId: entryId,
                                        entryId,
                                    },
                                ]
                                : [
                                    {
                                        id: tagId,
                                        name: newTag,
                                        catalogEntryId: entryId,
                                        entryId,
                                    },
                                ];
                        }
                    });
                });
            } catch {
                failed++;
            }
        }

        // Feedback ausgeben
        if (added > 0) {
            enqueueSnackbar(
                alreadyCount > 0
                    ? t("grid_view.tags_added_with_existing", {
                        added,
                        existing: alreadyCount,
                    })
                    : t("grid_view.tags_added_count", { count: added }),
                { variant: "success" }
            );
        } else if (failed > 0) {
            enqueueSnackbar(t("grid_view.tags_adding_failed"), { variant: "error" });
        }

        setIsTagging(false);
    }, [newTag, selectedRows, enqueueSnackbar, t, refetch, data, filteredRows, addTag]);

    // Memoized values
    const allTags = useMemo(() => filterTags(tags).sort(), [tags, filterTags]);
    const isAnyColumnHidden = useMemo(() => Object.values(visibleColumns).some(
        (value) => !value
    ), [visibleColumns]);

    // Effekte für das Nachladen von Dokumentnamen und Tags
    useEffect(() => {
        const fetchDocumentNames = async () => {
            const newDocumentData: {
                [key: string]: { name: string | null; id: string | null };
            } = {};

            for (const id of modelIds) {
                if (!documentNames[id]) {
                    try {
                        const response = await getBag({ variables: { id } });
                        const documentNode =
                          response.data?.getBag?.documentedBy?.nodes[0]?.relatingDocument;
                        const documentName = documentNode?.name || null;
                        const documentId = documentNode?.id || null;
                        newDocumentData[id] = { name: documentName, id: documentId };
                    } catch (error) {
                        // Fehler beim Laden ignorieren
                    }
                }
            }

            if (Object.keys(newDocumentData).length > 0) {
                setDocumentNames(prev => ({ ...prev, ...newDocumentData }));
            }
        };

        if (modelIds.length > 0) {
            fetchDocumentNames();
        }
    }, [modelIds, getBag, documentNames]);

    // Memoized values
    const columns: GridColDef[] = useMemo(() => [
        ...(visibleColumns.document
            ? [
                {
                    field: "document",
                    headerName: t("grid_view.reference_documents"),
                    flex: 1,
                    minWidth: 200,
                    renderCell: (params: GridRenderCellParams) => {
                        const documentName =
                            documentNames[params.row.ids.model]?.name || params.value;
                        const documentId = documentNames[params.row.ids.model]?.id;

                        return (
                            <Box
                                sx={{
                                    cursor: documentId ? "pointer" : "default",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    "&:hover": {
                                        textDecoration: documentId ? "underline" : "none",
                                    },
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (documentId) {
                                        handleOnSelect(documentId, "document");
                                    }
                                }}
                            >
                                {documentName || "\u00A0"}
                            </Box>
                        );
                    },
                },
            ]
            : []),

        ...(visibleColumns.model
            ? [
                {
                    field: "model",
                    headerName: t("grid_view.domain_models"),
                    flex: 1,
                    minWidth: 200,
                    renderCell: (params: GridRenderCellParams) => (
                        <Box
                            sx={{
                                cursor: params.value ? "pointer" : "default",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    textDecoration: params.value ? "underline" : "none",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (params.value) {
                                    handleOnSelect(params.row.ids.model, "model");
                                }
                            }}
                        >
                            {params.value || "\u00A0"}
                        </Box>
                    ),
                },
            ]
            : []),

        ...(visibleColumns.group
            ? [
                {
                    field: "group",
                    headerName: t("grid_view.groups"),
                    flex: 1,
                    minWidth: 150,
                    renderCell: (params: GridRenderCellParams) => (
                        <Box
                            sx={{
                                cursor: params.value ? "pointer" : "default",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    textDecoration: params.value ? "underline" : "none",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (params.value) {
                                    handleOnSelect(params.row.ids.group, "group");
                                }
                            }}
                        >
                            {params.value || "\u00A0"}
                        </Box>
                    ),
                },
            ]
            : []),

        ...(visibleColumns.class
            ? [
                {
                    field: "class",
                    headerName: t("grid_view.classes"),
                    flex: 1,
                    minWidth: 150,
                    renderCell: (params: GridRenderCellParams) => (
                        <Box
                            sx={{
                                cursor: params.value ? "pointer" : "default",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    textDecoration: params.value ? "underline" : "none",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (params.value) {
                                    handleOnSelect(params.row.ids.class, "class");
                                }
                            }}
                        >
                            {params.value || "\u00A0"}
                        </Box>
                    ),
                },
            ]
            : []),

        ...(visibleColumns.propertyGroup
            ? [
                {
                    field: "propertyGroup",
                    headerName: t("grid_view.property_groups"),
                    flex: 1,
                    minWidth: 180,
                    renderCell: (params: GridRenderCellParams) => (
                        <Box
                            sx={{
                  cursor: params.value ? "pointer" : "default",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    textDecoration: params.value ? "underline" : "none",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (params.value) {
                    handleOnSelect(
                      params.row.ids.propertyGroup,
                      "propertyGroup"
                    );
                  }
                }}
              >
                {params.value || "\u00A0"}
              </Box>
            ),
          },
        ]
      : []),

    ...(visibleColumns.property
      ? [
          {
            field: "property",
            headerName: t("grid_view.properties"),
            flex: 1,
            minWidth: 180,
            renderCell: (params: GridRenderCellParams) => (
              <Box
                sx={{
                  cursor: params.value ? "pointer" : "default",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    textDecoration: params.value ? "underline" : "none",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (params.value) {
                    handleOnSelect(params.row.ids.property, "property");
                  }
                }}
              >
                {params.value || "\u00A0"}
              </Box>
            ),
          },
        ]
      : []),
  ], [visibleColumns, documentNames, handleOnSelect, t]);

  // Show loading spinner while data is being fetched
  if (propertyTreeLoading) {
    return <LoadingSpinner message={t("grid_view.loading_table_contents")} fullscreen={true} />;
  }

  if (propertyTreeError)
    return <Typography>Error: {propertyTreeError.message}</Typography>;
  if (bagError) return <Typography>Error: {bagError.message}</Typography>;

  return (
    <TableContainer>
      <FixedContainer>
        <TagFilterSection
          allTags={allTags}
          selectedTag={selectedTag}
          handleTagFilter={handleTagFilter}
          newTag={newTag}
          handleTagChange={handleTagChange}
          handleAddTag={handleAddTag}
          t={t}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowOnlyColumn("document")}
            >
              {t("grid_view.show_only_documents")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowOnlyColumn("model")}
            >
              {t("grid_view.show_only_models")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowOnlyColumn("group")}
            >
              {t("grid_view.show_only_groups")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowOnlyColumn("class")}
            >
              {t("grid_view.show_only_classes")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowOnlyColumn("propertyGroup")}
            >
              {t("grid_view.show_only_property_groups")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShowOnlyColumn("property")}
            >
              {t("grid_view.show_only_properties")}
            </Button>
            {isAnyColumnHidden && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleShowAllColumns}
              >
                {t("grid_view.show_all")}
              </Button>
            )}
          </ButtonContainer>

          {/* Show loading indicator when tagging */}
          {isTagging && (
            <Box sx={{ width: "100%", mt: 1, mb: 1 }}>
              <LinearProgress />
              <Typography
                variant="caption"
                sx={{ mt: 0.5, display: "block", textAlign: "center" }}
              >
                {t("grid_view.adding_tags_please_wait")}
              </Typography>
            </Box>
          )}
        </Box>
      </FixedContainer>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.uniqueId}
          checkboxSelection
          onRowSelectionModelChange={(
            newSelectionModel: GridRowSelectionModel
          ) => {
            // Extract IDs from the selection model based on its structure
            let selectedIDs: string[] = [];

            if (newSelectionModel && typeof newSelectionModel === "object") {
              if (
                "ids" in newSelectionModel &&
                newSelectionModel.ids instanceof Set
              ) {
                // Extract IDs from Set and convert to strings
                selectedIDs = Array.from(newSelectionModel.ids).map((id) =>
                  String(id)
                );
              } else if (Array.isArray(newSelectionModel)) {
                // Fallback for array format (older versions)
                selectedIDs = newSelectionModel.map((id) => String(id));
              }
            }

            setSelectedRows(selectedIDs);
          }}
          density="standard"
          disableRowSelectionOnClick
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 100, page: 0 },
            },
          }}
          scrollbarSize={10}
          sx={{
            height: "100%",
            width: "100%",
            flexGrow: 1,
            border: "none",
            "& .MuiDataGrid-virtualScroller": {
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "4px",
              },
            },
            "& .MuiDataGrid-cell": {
              padding: "8px",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f9f9f9",
            },
            "& .MuiDataGrid-main": {
              overflow: "hidden",
              flexGrow: 1,
            },
          }}
          showToolbar
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 300 },
              csvOptions: {
                delimiter: ",",
                fileName: `datacat-export_${new Date()
                  .toISOString()
                  .slice(0, 10)}`,
                utf8WithBom: true,
              },
            },
          }}
        />
      </Box>
    </TableContainer>
  );
};

export default memo(GridViewView);