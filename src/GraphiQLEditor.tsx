import {GraphiQL} from "graphiql";
import "graphiql/graphiql.css";
import useGraphiQLFetcher from "./hooks/useGraphiQLFetcher";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    window.MonacoEnvironment = {
        getWorker: function () {
            // Erstelle einen leeren Worker aus einem leeren Blob
            const blob = new Blob([""], { type: "application/javascript" });
            const url = URL.createObjectURL(blob);
            return new Worker(url);
        }
    };
}

const graphiqlStyles = `
.graphiql-wrapper {
  height: 100vh;
  width: 100%;
}
`;

export default function GraphiQLEditor() {
    const graphiqlFetcher = useGraphiQLFetcher();
    
    useEffect(() => {
        // Create style element
        const styleEl = document.createElement('style');
        styleEl.textContent = graphiqlStyles;
        document.head.appendChild(styleEl);
        
        // Force window resize to make GraphiQL adjust to its container
        const resizeEvent = window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
        
        // Cleanup when component unmounts
        return () => {
            document.head.removeChild(styleEl);
            clearTimeout(resizeEvent);
        };
    }, []);
    
    return (
        <div className="graphiql-wrapper">
            <GraphiQL 
                fetcher={graphiqlFetcher}
                defaultEditorToolsVisibility={true}
                isHeadersEditorEnabled={true}
                shouldPersistHeaders={true}
                dangerouslyAssumeSchemaIsValid={true}
                defaultTabs={[{query: "", variables: "", headers: ""}]}
                aria-label="GraphiQL IDE"
                showPersistHeadersSettings={false}
            />
        </div>
    );
}