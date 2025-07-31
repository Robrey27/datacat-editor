import { useMemo } from 'react';

const GROUP_TAG_ID = "5997da9b-a716-45ae-84a9-e2a7d186bcf9";
const MODEL_TAG_ID = "6f96aaa7-e08f-49bb-ac63-93061d4c5db2";
const PROPERTY_GROUP_TAG_NAME = "Merkmalsgruppe";
const PROPERTY_GROUP_TAG_ID = "93b5a15d-87c8-485a-b0ad-6ad9feb72b3e";

export const useIDSData = (
  data: any,
  allItemsData: any,
  directQueryData: any,
  allItemsError: any,
  directQueryError: any,
  newlyCreatedPropertySets: Map<string, any[]>
) => {
  // Merkmalsgruppen extrahieren - Backend PropertySets
  const backendPropertyGroupOptions = useMemo(() => {
    const dataToUse = directQueryData || allItemsData;
    const errorToUse = directQueryError || allItemsError;
    
    if (errorToUse || !dataToUse?.search?.nodes) {
      return [];
    }
    
    const nests = dataToUse.search.nodes.filter((n: any) => n.recordType === "Nest");
    
    const propertyGroups = nests.filter((n: any) => 
      Array.isArray(n.tags) && 
      n.tags.some((t: any) => 
        t.name === PROPERTY_GROUP_TAG_NAME || 
        t.id === PROPERTY_GROUP_TAG_ID
      )
    );
    
    return propertyGroups.map((n: any) => ({
      id: n.id,
      name: n.name ?? "",
      tags: n.tags,
      isLocal: false,
    })).sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
  }, [allItemsData, allItemsError, directQueryData, directQueryError]);

  // Kombinierte PropertyGroup-Optionen (Backend + lokale)
  const propertyGroupOptions = useMemo(() => {
    const localPropertySets = Array.from(newlyCreatedPropertySets.keys()).map(name => ({
      id: `local-${name}`,
      name,
      tags: [{ name: "Lokal erstellt" }],
      isLocal: true,
    }));
    
    return [...backendPropertyGroupOptions, ...localPropertySets]
      .sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
  }, [backendPropertyGroupOptions, newlyCreatedPropertySets]);

  // Fachmodelle extrahieren
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
  }, [data?.hierarchy?.nodes]);

  // Alle Klassen aller Modelle (für Requirements)
  const allClassOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes || !data?.hierarchy?.paths) return [];
    
    const nodes = data.hierarchy.nodes;
    const paths = data.hierarchy.paths;
    
    const nodeMap = new Map(nodes.map((n: any) => [n.id, n]));
    const result: {
      name: string;
      id: string;
      groupName?: string;
      modelName?: string;
      modelId?: string;
    }[] = [];
    const seen = new Set<string>();

    for (const path of paths) {
      let modelName = "";
      let modelId = "";
      let groupName = "";
      let classNode: any = null;
      
      for (let i = path.length - 1; i >= 0; i--) {
        const node = nodeMap.get(path[i]) as any;
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
            break;
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

  return {
    propertyGroupOptions,
    modelOptions,
    allClassOptions,
  };
};
