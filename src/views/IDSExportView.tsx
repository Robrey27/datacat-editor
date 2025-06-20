import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
  Divider,
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { T } from "@tolgee/react";
import { usePropertyTreeQuery } from "../generated/types";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

// Tag-IDs wie in GridViewView
const GROUP_TAG_ID = "5997da9b-a716-45ae-84a9-e2a7d186bcf9";
const MODEL_TAG_ID = "6f96aaa7-e08f-49bb-ac63-93061d4c5db2";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

// IDS-relevante IFC-Entitäten laut IFC4 (alphabetisch, nur Klassen, alle in CAPSLOCK)
const IDS_IFC_ENTITIES = [
  "IFCACTOR",
  "IFCACTORROLE",
  "IFCACTORTYPE",
  "IFCADDRESS",
  "IFCANNOTATION",
  "IFCANNOTATIONFILLAREA",
  "IFCAPPLICATION",
  "IFCAPPLIEDVALUE",
  "IFCAPPROVAL",
  "IFCAPPROVALRELATIONSHIP",
  "IFCARBITRARYCLOSEDPROFILEDEF",
  "IFCARBITRARYOPENPROFILEDEF",
  "IFCARBITRARYPROFILEDEFWITHVOIDS",
  "IFCASSET",
  "IFCASYMMETRICISHAPEPROFILEDEF",
  "IFCAUDIOVISUALAPPLIANCE",
  "IFCAUDIOVISUALAPPLIANCETYPE",
  "IFCAxis1PLACEMENT",
  "IFCAxis2PLACEMENT2D",
  "IFCAxis2PLACEMENT3D",
  "IFCBEAM",
  "IFCBEAMTYPE",
  "IFCBEARING",
  "IFCBEARINGTYPE",
  "IFCBUILDING",
  "IFCBUILDINGELEMENTPART",
  "IFCBUILDINGELEMENTPARTTYPE",
  "IFCBUILDINGELEMENTPROXY",
  "IFCBUILDINGELEMENTPROXYTYPE",
  "IFCBUILDINGSTOREY",
  "IFCBUILDINGSYSTEM",
  "IFCBURNER",
  "IFCBURNERTYPE",
  "IFCCABLECARRIERFITTING",
  "IFCCABLECARRIERFITTINGTYPE",
  "IFCCABLECARRIERSEGMENT",
  "IFCCABLECARRIERSEGMENTTYPE",
  "IFCCABLEFITTING",
  "IFCCABLEFITTINGTYPE",
  "IFCCABLESEGMENT",
  "IFCCABLESEGMENTTYPE",
  "IFCCAISSONFOUNDATION",
  "IFCCAISSONFOUNDATIONTYPE",
  "IFCCARTESIANPOINT",
  "IFCCARTESIANPOINTLIST",
  "IFCCARTESIANPOINTLIST2D",
  "IFCCARTESIANPOINTLIST3D",
  "IFCCARTESIANTRANSFORMATIONOPERATOR",
  "IFCCARTESIANTRANSFORMATIONOPERATOR2D",
  "IFCCARTESIANTRANSFORMATIONOPERATOR2DNONUNIFORM",
  "IFCCARTESIANTRANSFORMATIONOPERATOR3D",
  "IFCCARTESIANTRANSFORMATIONOPERATOR3DNONUNIFORM",
  "IFCCENTERLINEPROFILEDEF",
  "IFCCHILLER",
  "IFCCHILLERTYPE",
  "IFCCHIMNEY",
  "IFCCHIMNEYTYPE",
  "IFCCIRCLE",
  "IFCCIRCLEHOLLOWPROFILEDEF",
  "IFCCIRCLEPROFILEDEF",
  "IFCCIVILELEMENT",
  "IFCCIVILELEMENTTYPE",
  "IFCCLASSIFICATION",
  "IFCCLASSIFICATIONREFERENCE",
  "IFCCLOSEDSHELL",
  "IFCCLOTHOID",
  "IFCCOIL",
  "IFCCOILTYPE",
  "IFCCOLUMN",
  "IFCCOLUMNTYPE",
  "IFCCOMMUNICATIONSAPPLIANCE",
  "IFCCOMMUNICATIONSAPPLIANCETYPE",
  "IFCCOMPLEXPROPERTY",
  "IFCCOMPLEXPROPERTYTEMPLATE",
  "IFCCOMPOSITECURVE",
  "IFCCOMPOSITECURVEONSURFACE",
  "IFCCOMPOSITECURVESEGMENT",
  "IFCCOMPOSITEPROFILEDEF",
  "IFCCOMPRESSOR",
  "IFCCOMPRESSORTYPE",
  "IFCCONDENSER",
  "IFCCONDENSERTYPE",
  "IFCCONIC",
  "IFCCONNECTEDFACESET",
  "IFCCONNECTIONCURVEGEOMETRY",
  "IFCCONNECTIONGEOMETRY",
  "IFCCONNECTIONPOINTECCENTRICITY",
  "IFCCONNECTIONPOINTGEOMETRY",
  "IFCCONNECTIONSURFACEGEOMETRY",
  "IFCCONNECTIONVOLUMEGEOMETRY",
  "IFCCONSTRAINT",
  "IFCCONSTRUCTIONEQUIPMENTRESOURCE",
  "IFCCONSTRUCTIONEQUIPMENTRESOURCETYPE",
  "IFCCONSTRUCTIONMATERIALRESOURCE",
  "IFCCONSTRUCTIONMATERIALRESOURCETYPE",
  "IFCCONSTRUCTIONPRODUCTRESOURCE",
  "IFCCONSTRUCTIONPRODUCTRESOURCETYPE",
  "IFCCONSTRUCTIONRESOURCE",
  "IFCCONSTRUCTIONRESOURCETYPE",
  "IFCCONTEXT",
  "IFCCONTEXTDEPENDENTUNIT",
  "IFCCONTROL",
  "IFCCONTROLLER",
  "IFCCONTROLLERTYPE",
  "IFCCONVERSIONBASEDUNIT",
  "IFCCONVERSIONBASEDUNITWITHOFFSET",
  "IFCCONVEYORSEGMENT",
  "IFCCONVEYORSEGMENTTYPE",
  "IFCCOOLEDBEAM",
  "IFCCOOLEDBEAMTYPE",
  "IFCCOOLINGTOWER",
  "IFCCOOLINGTOWERTYPE",
  "IFCCOORDINATEOPERATION",
  "IFCCOORDINATEREFERENCESYSTEM",
  "IFCCOSINESPIRAL",
  "IFCCOSTITEM",
  "IFCCOSTSCHEDULE",
  "IFCCOSTVALUE",
  "IFCCOURSE",
  "IFCCOURSETYPE",
  "IFCCOVERING",
  "IFCCOVERINGTYPE",
  "IFCCREWRESOURCE",
  "IFCCREWRESOURCETYPE",
  "IFCCSGPRIMITIVE3D",
  "IFCCSGSOLID",
  "IFCCURRENCYRELATIONSHIP",
  "IFCCURTAINWALL",
  "IFCCURTAINWALLTYPE",
  "IFCCURVE",
  "IFCCURVEBOUNDEDPLANE",
  "IFCCURVEBOUNDEDSURFACE",
  "IFCCURVESEGMENT",
  "IFCCURVESTYLE",
  "IFCCURVESTYLEFONT",
  "IFCCURVESTYLEFONTANDSCALING",
  "IFCCURVESTYLEFONTPATTERN",
  "IFCCYLINDRICALSURFACE",
  "IFCDAMPER",
  "IFCDAMPERTYPE",
  "IFCDEEPFOUNDATION",
  "IFCDEEPFOUNDATIONTYPE",
  "IFCDERIVEDPROFILEDEF",
  "IFCDERIVEDUNIT",
  "IFCDERIVEDUNITELEMENT",
  "IFCDIMENSIONALEXPONENTS",
  "IFCDIRECTION",
  "IFCDIRECTRIXCURVESWEPTAREASOLID",
  "IFCDIRECTRIXDERIVEDREFERENCESWEPTAREASOLID",
  "IFCDISCRETEACCESSORY",
  "IFCDISCRETEACCESSORYTYPE",
  "IFCDISTRIBUTIONBOARD",
  "IFCDISTRIBUTIONBOARDTYPE",
  "IFCDISTRIBUTIONCHAMBERELEMENT",
  "IFCDISTRIBUTIONCHAMBERELEMENTTYPE",
  "IFCDISTRIBUTIONCIRCUIT",
  "IFCDISTRIBUTIONCONTROLELEMENT",
  "IFCDISTRIBUTIONCONTROLELEMENTTYPE",
  "IFCDISTRIBUTIONELEMENT",
  "IFCDISTRIBUTIONELEMENTTYPE",
  "IFCDISTRIBUTIONFLOWELEMENT",
  "IFCDISTRIBUTIONFLOWELEMENTTYPE",
  "IFCDISTRIBUTIONPORT",
  "IFCDISTRIBUTIONSYSTEM",
  "IFCDOCUMENTINFORMATION",
  "IFCDOCUMENTINFORMATIONRELATIONSHIP",
  "IFCDOCUMENTREFERENCE",
  "IFCDOOR",
  "IFCDOORLININGPROPERTIES",
  "IFCDOORPANELPROPERTIES",
  "IFCDOORTYPE",
  "IFCDRAUGHTINGPREDEFINEDCOLOUR",
  "IFCDRAUGHTINGPREDEFINEDCURVEFONT",
  "IFCDUCTFITTING",
  "IFCDUCTFITTINGTYPE",
  "IFCDUCTSEGMENT",
  "IFCDUCTSEGMENTTYPE",
  "IFCDUCTSILENCER",
  "IFCDUCTSILENCERTYPE",
  "IFCEARTHWORKSCUT",
  "IFCEARTHWORKSELEMENT",
  "IFCEARTHWORKSFILL",
  "IFCEDGE",
  "IFCEDGECURVE",
  "IFCEDGELOOP",
  "IFCELECTRICAPPLIANCE",
  "IFCELECTRICAPPLIANCETYPE",
  "IFCELECTRICDISTRIBUTIONBOARD",
  "IFCELECTRICDISTRIBUTIONBOARDTYPE",
  "IFCELECTRICFLOWSTORAGEDEVICE",
  "IFCELECTRICFLOWSTORAGEDEVICETYPE",
  "IFCELECTRICFLOWTREATMENTDEVICE",
  "IFCELECTRICFLOWTREATMENTDEVICETYPE",
  "IFCELECTRICGENERATOR",
  "IFCELECTRICGENERATORTYPE",
  "IFCELECTRICMOTOR",
  "IFCELECTRICMOTORTYPE",
  "IFCELECTRICTIMECONTROL",
  "IFCELECTRICTIMECONTROLTYPE",
  "IFCELEMENT",
  "IFCELEMENTASSEMBLY",
  "IFCELEMENTASSEMBLYTYPE",
  "IFCELEMENTCOMPONENT",
  "IFCELEMENTCOMPONENTTYPE",
  "IFCELEMENTQUANTITY",
  "IFCELEMENTTYPE",
  "IFCELEMENTARYSURFACE",
  "IFCELLIPSE",
  "IFCELLIPSEPROFILEDEF",
  "IFCENERGYCONVERSIONDEVICE",
  "IFCENERGYCONVERSIONDEVICETYPE",
  "IFCENGINE",
  "IFCENGINETYPE",
  "IFCEVAPORATIVECOOLER",
  "IFCEVAPORATIVECOOLERTYPE",
  "IFCEVAPORATOR",
  "IFCEVAPORATORTYPE",
  "IFCEVENT",
  "IFCEVENTTIME",
  "IFCEVENTTYPE",
  "IFCEXTENDEDPROPERTIES",
  "IFCEXTERNALINFORMATION",
  "IFCEXTERNALREFERENCE",
  "IFCEXTERNALREFERENCERELATIONSHIP",
  "IFCEXTERNALSPATIALELEMENT",
  "IFCEXTERNALSPATIALSTRUCTUREELEMENT",
  "IFCEXTERNALLYDEFINEDHATCHSTYLE",
  "IFCEXTERNALLYDEFINEDSURFACESTYLE",
  "IFCEXTERNALLYDEFINEDTEXTFONT",
  "IFCEXTRUDEDAREASOLID",
  "IFCEXTRUDEDAREASOLIDTAPERED",
  "IFCFACE",
  "IFCFACEBASEDSURFACEMODEL",
  "IFCFACEBOUND",
  "IFCFACEOUTERBOUND",
  "IFCFACESURFACE",
  "IFCFACETEDBREP",
  "IFCFACETEDBREPWITHVOIDS",
  "IFCFACILITY",
  "IFCFACILITYPART",
  "IFCFACILITYPARTCOMMON",
  "IFCFAILURECONNECTIONCONDITION",
  "IFCFAN",
  "IFCFANTYPE",
  "IFCFASTENER",
  "IFCFASTENERTYPE",
  "IFCFEATUREELEMENT",
  "IFCFEATUREELEMENTADDITION",
  "IFCFEATUREELEMENTSUBTRACTION",
  "IFCFILLAREASTYLE",
  "IFCFILLAREASTYLEHATCHING",
  "IFCFILLAREASTYLETILES",
  "IFCFILTER",
  "IFCFILTERTYPE",
  "IFCFIRESUPPRESSIONTERMINAL",
  "IFCFIRESUPPRESSIONTERMINALTYPE",
  "IFCFIXEDREFERENCESWEPTAREASOLID",
  "IFCFLOWCONTROLLER",
  "IFCFLOWCONTROLLERTYPE",
  "IFCFLOWFITTING",
  "IFCFLOWFITTINGTYPE",
  "IFCFLOWINSTRUMENT",
  "IFCFLOWINSTRUMENTTYPE",
  "IFCFLOWMETER",
  "IFCFLOWMETERTYPE",
  "IFCFLOWMOVINGDEVICE",
  "IFCFLOWMOVINGDEVICETYPE",
  "IFCFLOWSEGMENT",
  "IFCFLOWSEGMENTTYPE",
  "IFCFLOWSTORAGEDEVICE",
  "IFCFLOWSTORAGEDEVICETYPE",
  "IFCFLOWTERMINAL",
  "IFCFLOWTERMINALTYPE",
  "IFCFLOWTREATMENTDEVICE",
  "IFCFLOWTREATMENTDEVICETYPE",
  "IFCFOOTING",
  "IFCFOOTINGTYPE",
  "IFCFURNISHINGELEMENT",
  "IFCFURNISHINGELEMENTTYPE",
  "IFCFURNITURE",
  "IFCFURNITURETYPE",
  "IFCGEOGRAPHICCRS",
  "IFCGEOGRAPHICELEMENT",
  "IFCGEOGRAPHICELEMENTTYPE",
  "IFCGEOMETRICCURVESET",
  "IFCGEOMETRICREPRESENTATIONCONTEXT",
  "IFCGEOMETRICREPRESENTATIONITEM",
  "IFCGEOMETRICREPRESENTATIONSUBCONTEXT",
  "IFCGEOMETRICSET",
  "IFCGEOMODEL",
  "IFCGEOSLICE",
  "IFCGEOTECHNICALASSEMBLY",
  "IFCGEOTECHNICALELEMENT",
  "IFCGEOTECHNICALSTRATUM",
  "IFCGRADIENTCURVE",
  "IFCGRID",
  "IFCGRIDAXIS",
  "IFCGRIDPLACEMENT",
  "IFCGROUP",
  "IFCHALFSPACESOLID",
  "IFCHEATEXCHANGER",
  "IFCHEATEXCHANGERTYPE",
  "IFCHUMIDIFIER",
  "IFCHUMIDIFIERTYPE",
  "IFCISHAPEPROFILEDEF",
  "IFCIMAGETEXTURE",
  "IFCIMPACTPROTECTIONDEVICE",
  "IFCIMPACTPROTECTIONDEVICETYPE",
  "IFCINDEXEDCOLOURMAP",
  "IFCINDEXEDPOLYCURVE",
  "IFCINDEXEDPOLYGONALFACE",
  "IFCINDEXEDPOLYGONALFACEWITHVOIDS",
  "IFCINDEXEDPOLYGONALTEXTUREMAP",
  "IFCINDEXEDTEXTUREMAP",
  "IFCINDEXEDTRIANGLETEXTUREMAP",
  "IFCINTERCEPTOR",
  "IFCINTERCEPTORTYPE",
  "IFCINTERSECTIONCURVE",
  "IFCINVENTORY",
  "IFCIRREGULARTIMESERIES",
  "IFCIRREGULARTIMESERIESVALUE",
  "IFCJUNCTIONBOX",
  "IFCJUNCTIONBOXTYPE",
  "IFCKERB",
  "IFCKERBTYPE",
  "IFCLSHAPEPROFILEDEF",
  "IFCLABORRESOURCE",
  "IFCLABORRESOURCETYPE",
  "IFCLAGTIME",
  "IFCLAMP",
  "IFCLAMPTYPE",
  "IFCLIBRARYINFORMATION",
  "IFCLIBRARYREFERENCE",
  "IFCLIGHTDISTRIBUTIONDATA",
  "IFCLIGHTFIXTURE",
  "IFCLIGHTFIXTURETYPE",
  "IFCLIGHTINTENSITYDISTRIBUTION",
  "IFCLIGHTSOURCE",
  "IFCLIGHTSOURCEAMBIENT",
  "IFCLIGHTSOURCEDIRECTIONAL",
  "IFCLIGHTSOURCEGONIOMETRIC",
  "IFCLIGHTSOURCEPOSITIONAL",
  "IFCLIGHTSOURCESPOT",
  "IFCLINE",
  "IFCLINEARELEMENT",
  "IFCLINEARPLACEMENT",
  "IFCLINEARPOSITIONINGELEMENT",
  "IFCLIQUIDTERMINAL",
  "IFCLIQUIDTERMINALTYPE",
  "IFCLOCALPLACEMENT",
  "IFCLOOP",
  "IFCMANIFOLDSOLIDBREP",
  "IFCMAPCONVERSION",
  "IFCMAPCONVERSIONSCALED",
  "IFCMAPPEDITEM",
  "IFCMARINEFACILITY",
  "IFCMARINEPART",
  "IFCMATERIAL",
  "IFCMATERIALCLASSIFICATIONRELATIONSHIP",
  "IFCMATERIALCONSTITUENT",
  "IFCMATERIALCONSTITUENTSET",
  "IFCMATERIALDEFINITION",
  "IFCMATERIALDEFINITIONREPRESENTATION",
  "IFCMATERIALLAYER",
  "IFCMATERIALLAYERSET",
  "IFCMATERIALLAYERSETUSAGE",
  "IFCMATERIALLAYERWITHOFFSETS",
  "IFCMATERIALLIST",
  "IFCMATERIALPROFILE",
  "IFCMATERIALPROFILESET",
  "IFCMATERIALPROFILESETUSAGE",
  "IFCMATERIALPROFILESETUSAGETAPERING",
  "IFCMATERIALPROFILEWITHOFFSETS",
  "IFCMATERIALPROPERTIES",
  "IFCMATERIALRELATIONSHIP",
  "IFCMATERIALUSAGEDEFINITION",
  "IFCMEASUREWITHUNIT",
  "IFCMECHANICALFASTENER",
  "IFCMECHANICALFASTENERTYPE",
  "IFCMEDICALDEVICE",
  "IFCMEDICALDEVICETYPE",
  "IFCMEMBER",
  "IFCMEMBERTYPE",
  "IFCMETRIC",
  "IFCMIRROREDPROFILEDEF",
  "IFCMOBILETELECOMMUNICATIONSAPPLIANCE",
  "IFCMOBILETELECOMMUNICATIONSAPPLIANCETYPE",
  "IFCMONETARYUNIT",
  "IFCMOORINGDEVICE",
  "IFCMOORINGDEVICETYPE",
  "IFCMOTORCONNECTION",
  "IFCMOTORCONNECTIONTYPE",
  "IFCNAMEDUNIT",
  "IFCNAVIGATIONELEMENT",
  "IFCNAVIGATIONELEMENTTYPE",
  "IFCOBJECT",
  "IFCOBJECTDEFINITION",
  "IFCOBJECTPLACEMENT",
  "IFCOBJECTIVE",
  "IFCOCCUPANT",
  "IFCOFFSETCURVE",
  "IFCOFFSETCURVE2D",
  "IFCOFFSETCURVE3D",
  "IFCOFFSETCURVEBYDISTANCES",
  "IFCOPENCROSSPROFILEDEF",
  "IFCOPENSHELL",
  "IFCOPENINGELEMENT",
  "IFCORGANIZATION",
  "IFCORGANIZATIONRELATIONSHIP",
  "IFCORIENTEDEDGE",
  "IFCOUTERBOUNDARYCURVE",
  "IFCOUTLET",
  "IFCOUTLETTYPE",
  "IFCOWNERHISTORY",
  "IFCPARAMETERIZEDPROFILEDEF",
  "IFCPATH",
  "IFCPAVEMENT",
  "IFCPAVEMENTTYPE",
  "IFPCURVE",
  "IFCPERFORMANCEHISTORY",
  "IFCPERMEABLECOVERINGPROPERTIES",
  "IFCPERMIT",
  "IFCPERSON",
  "IFCPERSONANDORGANIZATION",
  "IFCPHYSICALCOMPLEXQUANTITY",
  "IFCPHYSICALQUANTITY",
  "IFCPHYSICALSIMPLEQUANTITY",
  "IFCPILE",
  "IFCPILETYPE",
  "IFCPIPEFITTING",
  "IFCPIPEFITTINGTYPE",
  "IFCPIPESEGMENT",
  "IFCPIPESEGMENTTYPE",
  "IFCPIXELTEXTURE",
  "IFCPLACEMENT",
  "IFCPLANARBOX",
  "IFCPLANAREXTENT",
  "IFCPLANE",
  "IFCPLATE",
  "IFCPLATETYPE",
  "IFCPOINT",
  "IFCPOINTBYDISTANCEEXPRESSION",
  "IFCPOINTONCURVE",
  "IFCPOINTONSURFACE",
  "IFCPOLYLOOP",
  "IFCPOLYGONALBOUNDEDHALFSPACE",
  "IFCPOLYGONALFACESET",
  "IFCPOLYLINE",
  "IFCPOLYNOMIALCURVE",
  "IFCPORT",
  "IFCPOSITIONINGELEMENT",
  "IFCPOSTALADDRESS",
  "IFCPREDEFINEDCOLOUR",
  "IFCPREDEFINEDCURVEFONT",
  "IFCPREDEFINEDITEM",
  "IFCPREDEFINEDPROPERTIES",
  "IFCPREDEFINEDPROPERTYSET",
  "IFCPREDEFINEDTEXTFONT",
  "IFCPRESENTATIONITEM",
  "IFCPRESENTATIONLAYERASSIGNMENT",
  "IFCPRESENTATIONLAYERWITHSTYLE",
  "IFCPRESENTATIONSTYLE",
  "IFCPROCEDURE",
  "IFCPROCEDURETYPE",
  "IFCPROCESS",
  "IFCPRODUCT",
  "IFCPRODUCTDEFINITIONSHAPE",
  "IFCPRODUCTREPRESENTATION",
  "IFCPROFILEDEF",
  "IFCPROFILEPROPERTIES",
  "IFCPROJECT",
  "IFCPROJECTLIBRARY",
  "IFCPROJECTORDER",
  "IFCPROJECTEDCRS",
  "IFCPROJECTIONELEMENT",
  "IFCPROPERTY",
  "IFCPROPERTYABSTRACTION",
  "IFCPROPERTYBOUNDEDVALUE",
  "IFCPROPERTYDEFINITION",
  "IFCPROPERTYDEPENDENCYRELATIONSHIP",
  "IFCPROPERTYENUMERATEDVALUE",
  "IFCPROPERTYENUMERATION",
  "IFCPROPERTYLISTVALUE",
  "IFCPROPERTYREFERENCEVALUE",
  "IFCPROPERTYSET",
  "IFCPROPERTYSETDEFINITION",
  "IFCPROPERTYSETTEMPLATE",
  "IFCPROPERTYSINGLEVALUE",
  "IFCPROPERTYTABLEVALUE",
  "IFCPROPERTYTEMPLATE",
  "IFCPROPERTYTEMPLATEDEFINITION",
  "IFCPROTECTIVEDEVICE",
  "IFCPROTECTIVEDEVICETRIPPINGUNIT",
  "IFCPROTECTIVEDEVICETRIPPINGUNITTYPE",
  "IFCPROTECTIVEDEVICETYPE",
  "IFCPUMP",
  "IFCPUMPTYPE",
  "IFCQUANTITYAREA",
  "IFCQUANTITYCOUNT",
  "IFCQUANTITYLENGTH",
  "IFCQUANTITYNUMBER",
  "IFCQUANTITYSET",
  "IFCQUANTITYTIME",
  "IFCQUANTITYVOLUME",
  "IFCQUANTITYWEIGHT",
  "IFCRAIL",
  "IFCRAILTYPE",
  "IFCRAILING",
  "IFCRAILINGTYPE",
  "IFCRAILWAY",
  "IFCRAILWAYPART",
  "IFCRAMP",
  "IFCRAMPFLIGHT",
  "IFCRAMPFLIGHTTYPE",
  "IFCRAMPTYPE",
  "IFCRATIONALBSPLINECURVEWITHKNOTS",
  "IFCRATIONALBSPLINESURFACEWITHKNOTS",
  "IFCRECTANGLEHOLLOWPROFILEDEF",
  "IFCRECTANGLEPROFILEDEF",
  "IFCRECTANGULARPYRAMID",
  "IFCRECTANGULARTRIMMEDSURFACE",
  "IFCRECURRENCEPATTERN",
  "IFCREFERENCE",
  "IFCREFERENT",
  "IFCREGULARTIMESERIES",
  "IFCREINFORCEDSOIL",
  "IFCREINFORCEMENTBARPROPERTIES",
  "IFCREINFORCEMENTDEFINITIONPROPERTIES",
  "IFCREINFORCINGBAR",
  "IFCREINFORCINGBARTYPE",
  "IFCREINFORCINGELEMENT",
  "IFCREINFORCINGELEMENTTYPE",
  "IFCREINFORCINGMESH",
  "IFCREINFORCINGMESHTYPE",
  "IFCRELADHERESTOELEMENT",
  "IFCRELAGGREGATES",
  "IFCRELASSIGNS",
  "IFCRELASSIGNSTOACTOR",
  "IFCRELASSIGNSTOCONTROL",
  "IFCRELASSIGNSTOGROUP",
  "IFCRELASSIGNSTOGROUPBYFACTOR",
  "IFCRELASSIGNSTOPROCESS",
  "IFCRELASSIGNSTOPRODUCT",
  "IFCRELASSIGNSTORESOURCE",
  "IFCRELASSOCIATES",
  "IFCRELASSOCIATESAPPROVAL",
  "IFCRELASSOCIATESCLASSIFICATION",
  "IFCRELASSOCIATESCONSTRAINT",
  "IFCRELASSOCIATESDOCUMENT",
  "IFCRELASSOCIATESLIBRARY",
  "IFCRELASSOCIATESMATERIAL",
  "IFCRELASSOCIATESPROFILEDEF",
  "IFCRELCONNECTS",
  "IFCRELCONNECTSELEMENTS",
  "IFCRELCONNECTSPATH ELEMENTS",
  "IFCRELCONNECTSPORTTOELEMENT",
  "IFCRELCONNECTSPORTS",
  "IFCRELCONNECTSSTRUCTURALACTIVITY",
  "IFCRELCONNECTSSTRUCTURALMEMBER",
  "IFCRELCONNECTSWITHECCENTRICITY",
  "IFCRELCONNECTSWITHREALIZINGELEMENTS",
  "IFCRELCONTAINEDINSPATIALSTRUCTURE",
  "IFCRELCOVERSBLDGELEMENTS",
  "IFCRELCOVERSSPACES",
  "IFCRELDECLARES",
  "IFCRELDECOMPOSES",
  "IFCRELDEFINES",
  "IFCRELDEFINESBYOBJECT",
  "IFCRELDEFINESBYPROPERTIES",
  "IFCRELDEFINESBYTEMPLATE",
  "IFCRELDEFINESBYTYPE",
  "IFCRELFILLSELEMENT",
  "IFCRELFLOWCONTROLELEMENTS",
  "IFCRELINTERFERESELEMENTS",
  "IFCRELNESTS",
  "IFCRELPOSITIONS",
  "IFCRELPROJECTSELEMENT",
  "IFCRELREFERENCEDINSPATIALSTRUCTURE",
  "IFCRELSEQUENCE",
  "IFCRELSERVICESBUILDINGS",
  "IFCRELSPACEBOUNDARY",
  "IFCRELSPACEBOUNDARY1STLEVEL",
  "IFCRELSPACEBOUNDARY2NDLEVEL",
  "IFCRELVOIDSELEMENT",
  "IFCRELATIONSHIP",
  "IFCREPARAMETRISEDCOMPOSITECURVESEGMENT",
  "IFCREPRESENTATION",
  "IFCREPRESENTATIONCONTEXT",
  "IFCREPRESENTATIONITEM",
  "IFCREPRESENTATIONMAP",
  "IFCRESOURCE",
  "IFCRESOURCEAPPROVALRELATIONSHIP",
  "IFCRESOURCECONSTRAINTRELATIONSHIP",
  "IFCRESOURCELEVELRELATIONSHIP",
  "IFCRESOURCETIME",
  "IFCREVOLVEDAREASOLID",
  "IFCREVOLVEDAREASOLIDTAPERED",
  "IFCRIGHTCIRCULARCONE",
  "IFCRIGHTCIRCULARCYLINDER",
  "IFCRIGIDOPERATION",
  "IFCROAD",
  "IFCROADPART",
  "IFCROOF",
  "IFCROOFTYPE",
  "IFCROOT",
  "IFCROUNDEDRECTANGLEPROFILEDEF",
  "IFCSIUNIT",
  "IFCSANITARYTERMINAL",
  "IFCSANITARYTERMINALTYPE",
  "IFCSCHEDULINGTIME",
  "IFCSEAMCURVE",
  "IFCSECONDORDERPOLYNOMIALSPIRAL",
  "IFCSECTIONPROPERTIES",
  "IFCSECTIONREINFORCEMENTPROPERTIES",
  "IFCSECTIONEDSOLID",
  "IFCSECTIONEDSOLIDHORIZONTAL",
  "IFCSECTIONEDSPINE",
  "IFCSECTIONEDSURFACE",
  "IFCSEGMENT",
  "IFCSEGMENTEDREFERENCECURVE",
  "IFCSENSOR",
  "IFCSENSORTYPE",
  "IFCSEVENTHORDERPOLYNOMIALSPIRAL",
  "IFCSHADINGDEVICE",
  "IFCSHADINGDEVICETYPE",
  "IFCSHAPEASPECT",
  "IFCSHAPEMODEL",
  "IFCSHAPEREPRESENTATION",
  "IFCSHELLBASEDSURFACEMODEL",
  "IFCSIGN",
  "IFCSIGNTYPE",
  "IFCSIGNAL",
  "IFCSIGNALTYPE",
  "IFCSIMPLEPROPERTY",
  "IFCSIMPLEPROPERTYTEMPLATE",
  "IFCSINESPIRAL",
  "IFCSITE",
  "IFCSLAB",
  "IFCSLABTYPE",
  "IFCSLIPPAGECONNECTIONCONDITION",
  "IFCSOLARDEVICE",
  "IFCSOLARDEVICETYPE",
  "IFCSOLIDMODEL",
  "IFCSPACE",
  "IFCSPACEHEATER",
  "IFCSPACEHEATERTYPE",
  "IFCSPACETYPE",
  "IFCSPATIALELEMENT",
  "IFCSPATIALELEMENTTYPE",
  "IFCSPATIALSTRUCTUREELEMENT",
  "IFCSPATIALSTRUCTUREELEMENTTYPE",
  "IFCSPATIALZONE",
  "IFCSPATIALZONETYPE",
  "IFCSPHERE",
  "IFCSPHERICALSURFACE",
  "IFCSPIRAL",
  "IFCSTACKTERMINAL",
  "IFCSTACKTERMINALTYPE",
  "IFCSTAIR",
  "IFCSTAIRFLIGHT",
  "IFCSTAIRFLIGHTTYPE",
  "IFCSTAIRTYPE",
  "IFCSTRUCTURALACTION",
  "IFCSTRUCTURALACTIVITY",
  "IFCSTRUCTURALANALYSISMODEL",
  "IFCSTRUCTURALCONNECTION",
  "IFCSTRUCTURALCONNECTIONCONDITION",
  "IFCSTRUCTURALCURVEACTION",
  "IFCSTRUCTURALCURVECONNECTION",
  "IFCSTRUCTURALCURVEMEMBER",
  "IFCSTRUCTURALCURVEMEMBERVARYING",
  "IFCSTRUCTURALCURVEREACTION",
  "IFCSTRUCTURALITEM",
  "IFCSTRUCTURALLINEARACTION",
  "IFCSTRUCTURALLOAD",
  "IFCSTRUCTURALLOADCASE",
  "IFCSTRUCTURALLOADCONFIGURATION",
  "IFCSTRUCTURALLOADGROUP",
  "IFCSTRUCTURALLOADLINEARFORCE",
  "IFCSTRUCTURALLOADORRESULT",
  "IFCSTRUCTURALLOADPLANARFORCE",
  "IFCSTRUCTURALLOADSINGLEDISPLACEMENT",
  "IFCSTRUCTURALLOADSINGLEDISPLACEMENTDISTORTION",
  "IFCSTRUCTURALLOADSINGLEFORCE",
  "IFCSTRUCTURALLOADSINGLEFORCEWARPING",
  "IFCSTRUCTURALLOADSTATIC",
  "IFCSTRUCTURALLOADTEMPERATURE",
  "IFCSTRUCTURALMEMBER",
  "IFCSTRUCTURALPLANARACTION",
  "IFCSTRUCTURALPOINTACTION",
  "IFCSTRUCTURALPOINTCONNECTION",
  "IFCSTRUCTURALPOINTREACTION",
  "IFCSTRUCTURALREACTION",
  "IFCSTRUCTURALRESULTGROUP",
  "IFCSTRUCTURALSURFACEACTION",
  "IFCSTRUCTURALSURFACECONNECTION",
  "IFCSTRUCTURALSURFACEMEMBER",
  "IFCSTRUCTURALSURFACEMEMBERVARYING",
  "IFCSTRUCTURALSURFACEREACTION",
  "IFCSTYLEMODEL",
  "IFCSTYLEDITEM",
  "IFCSTYLEDREPRESENTATION",
  "IFCSUBCONTRACTRESOURCE",
  "IFCSUBCONTRACTRESOURCETYPE",
  "IFCSUBEDGE",
  "IFCSURFACE",
  "IFCSURFACECURVE",
  "IFCSURFACECURVESWEPTAREASOLID",
  "IFCSURFACEFEATURE",
  "IFCSURFACEOFLINEAREXTRUSION",
  "IFCSURFACEOFREVOLUTION",
  "IFCSURFACEREINFORCEMENTAREA",
  "IFCSURFACESTYLE",
  "IFCSURFACESTYLELIGHTING",
  "IFCSURFACESTYLEREFRACTION",
  "IFCSURFACESTYLERENDERING",
  "IFCSURFACESTYLESHADING",
  "IFCSURFACESTYLEWITHTEXTURES",
  "IFCSURFACETEXTURE",
  "IFCSWEPTAREASOLID",
  "IFCSWEPTDISKSOLID",
  "IFCSWEPTDISKSOLIDPOLYGONAL",
  "IFCSWEPTSURFACE",
  "IFCSWITCHINGDEVICE",
  "IFCSWITCHINGDEVICETYPE",
  "IFCSYSTEM",
  "IFCSYSTEMFURNITUREELEMENT",
  "IFCSYSTEMFURNITUREELEMENTTYPE",
  "IFCTSHAPEPROFILEDEF",
  "IFCTABLE",
  "IFCTABLECOLUMN",
  "IFCTABLEROW",
  "IFCTANK",
  "IFCTANKTYPE",
  "IFCTASK",
  "IFCTASKTIME",
  "IFCTASKTIMERECURRING",
  "IFCTASKTYPE",
  "IFCTELECOMADDRESS",
  "IFCTENDON",
  "IFCTENDONANCHOR",
  "IFCTENDONANCHORTYPE",
  "IFCTENDONCONDUIT",
  "IFCTENDONCONDUITTYPE",
  "IFCTENDONTYPE",
  "IFCTESSELLATEDFACESET",
  "IFCTESSELLATEDITEM",
  "IFCTEXTLITERAL",
  "IFCTEXTLITERALWITHEXTENT",
  "IFCTEXTSTYLE",
  "IFCTEXTSTYLEFONTMODEL",
  "IFCTEXTSTYLEFORDEFINEDFONT",
  "IFCTEXTSTYLETEXTMODEL",
  "IFCTEXTURECOORDINATE",
  "IFCTEXTURECOORDINATEGENERATOR",
  "IFCTEXTURECOORDINATEINDICES",
  "IFCTEXTURECOORDINATEINDICESWITHVOIDS",
  "IFCTEXTUREMAP",
  "IFCTEXTUREVERTEX",
  "IFCTEXTUREVERTEXLIST",
  "IFCTHIRDORDERPOLYNOMIALSPIRAL",
  "IFCTIMEPERIOD",
  "IFCTIMESERIES",
  "IFCTIMESERIESVALUE",
  "IFCTOPOLOGICALREPRESENTATIONITEM",
  "IFCTOPOLOGYREPRESENTATION",
  "IFCTOROIDALSURFACE",
  "IFCTRACKELEMENT",
  "IFCTRACKELEMENTTYPE",
  "IFCTRANSFORMER",
  "IFCTRANSFORMERTYPE",
  "IFCTRANSPORTELEMENT",
  "IFCTRANSPORTELEMENTTYPE",
  "IFCTRANSPORTATIONDEVICE",
  "IFCTRANSPORTATIONDEVICETYPE",
  "IFCTRAPEZIUMPROFILEDEF",
  "IFCTRIANGULATEDFACESET",
  "IFCTRIANGULATEDIRREGULARNETWORK",
  "IFCTRIMMEDCURVE",
  "IFCTUBEBUNDLE",
  "IFCTUBEBUNDLETYPE",
  "IFCTYPEOBJECT",
  "IFCTYPEPROCESS",
  "IFCTYPEPRODUCT",
  "IFCTYPERESOURCE",
  "IFCUISHAPEPROFILEDEF",
  "IFCUNITASSIGNMENT",
  "IFCUNITARYCONTROLELEMENT",
  "IFCUNITARYCONTROLELEMENTTYPE",
  "IFCUNITARYEQUIPMENT",
  "IFCUNITARYEQUIPMENTTYPE",
  "IFCVALVE",
  "IFCVALVETYPE",
  "IFCVECTOR",
  "IFCVEHICLE",
  "IFCVEHICLETYPE",
  "IFCVERTEX",
  "IFCVERTEXLOOP",
  "IFCVERTEXPOINT",
  "IFCVIBRATIONDAMPER",
  "IFCVIBRATIONDAMPERTYPE",
  "IFCVIBRATIONISOLATOR",
  "IFCVIBRATIONISOLATORTYPE",
  "IFCVIRTUALELEMENT",
  "IFCVIRTUALGRIDINTERSECTION",
  "IFCVOIDINGFEATURE",
  "IFCWALL",
  "IFCWALLSTANDARDCASE",
  "IFCWALLTYPE",
  "IFCWASTETERMINAL",
  "IFCWASTETERMINALTYPE",
  "IFCWELLKNOWNTEXT",
  "IFCWINDOW",
  "IFCWINDOWLININGPROPERTIES",
  "IFCWINDOWPANELPROPERTIES",
  "IFCWINDOWTYPE",
  "IFCWORKCALENDAR",
  "IFCWORKCONTROL",
  "IFCWORKPLAN",
  "IFCWORKSCHEDULE",
  "IFCWORKTIME",
  "IFCZSHAPEPROFILEDEF",
  "IFCZONE"
];

export const IDSExportView: React.FC = () => {
  const [specRows, setSpecRows] = useState<
    {
      id: number;
      name: string;
      applicabilityType: "type";
      ifcVersion: string;
      requirements: { type: "classification" | "attribute"; value: string[] | string; modelId?: string }[];
      ifcClass?: string;
    }[]
  >([]);
  const [addRowMode, setAddRowMode] = useState(false);
  const [specName, setSpecName] = useState("");
  const [applicabilityType, setApplicabilityType] = useState<"type">("type");
  const [ifcVersion, setIfcVersion] = useState("IFC4");
  const [requirements, setRequirements] = useState<
    { type: "classification" | "attribute"; value: string[] | string; modelId?: string }[]
  >([]);
  const [ifcClass, setIfcClass] = useState("");
  const [showIfcSuggestions, setShowIfcSuggestions] = useState(false);

  // DataCat
  const { data, loading, error } = usePropertyTreeQuery({
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });

  // Fachmodelle extrahieren
  const modelOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes) return [];
    return data.hierarchy.nodes
      .filter(
        (n) =>
          n.recordType === "Bag" &&
          Array.isArray(n.tags) &&
          n.tags.some((t: any) => t.id === MODEL_TAG_ID)
      )
      .map((n) => ({
        id: n.id,
        name: n.name,
      }))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [data]);

  // Alle Klassen aller Modelle (für Requirements)
  const allClassOptions = useMemo(() => {
    if (!data?.hierarchy?.nodes || !data?.hierarchy?.paths) return [];
    const nodes = data.hierarchy.nodes;
    const paths = data.hierarchy.paths;
    const result: {
      name: string;
      id: string;
      groupName?: string;
      modelName?: string;
      modelId?: string;
    }[] = [];
    const seen = new Set<string>();
    paths.forEach((path) => {
      let modelName = "";
      let modelId = "";
      let groupName = "";
      let classNode: any = null;
      path.forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        if (node) {
          if (node.recordType === "Bag" && Array.isArray(node.tags)) {
            if (node.tags.some((t: any) => t.id === GROUP_TAG_ID))
              groupName = node.name ?? "";
            if (node.tags.some((t: any) => t.id === MODEL_TAG_ID)) {
              modelName = node.name ?? "";
              modelId = node.id;
            }
          }
          if (node.recordType === "Subject") classNode = node;
        }
      });
      if (
        classNode &&
        classNode.name &&
        modelId &&
        !seen.has(classNode.id)
      ) {
        result.push({
          name: classNode.name,
          id: classNode.id,
          groupName: groupName || undefined,
          modelName: modelName || undefined,
          modelId,
        });
        seen.add(classNode.id);
      }
    });
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  // IFC Vorschläge
  const ifcSuggestions = useMemo(() => {
    if (!ifcClass || ifcClass.length < 4) return [];
    const input = ifcClass.toUpperCase();
    return IDS_IFC_ENTITIES.filter(ent => ent.startsWith(input)).slice(0, 20);
  }, [ifcClass]);

  useEffect(() => {
    if (ifcClass.length >= 4 && ifcSuggestions.length > 0) {
      setShowIfcSuggestions(true);
    } else {
      setShowIfcSuggestions(false);
    }
  }, [ifcClass, ifcSuggestions]);

  // Requirement hinzufügen
  const handleAddRequirement = () => {
    setRequirements(reqs => [...reqs, { type: "classification", value: "" }]);
  };

  // Requirement ändern
  const handleRequirementChange = (idx: number, value: string[] | string, modelId?: string) => {
    setRequirements(reqs =>
      reqs.map((r, i) =>
        i === idx ? { ...r, value, ...(modelId !== undefined ? { modelId } : {}) } : r
      )
    );
  };

  // Requirement-Typ ändern
  const handleRequirementTypeChange = (idx: number, type: "classification" | "attribute") => {
    setRequirements(reqs =>
      reqs.map((r, i) =>
        i === idx ? { ...r, type, value: type === "attribute" ? [] : "", modelId: undefined } : r
      )
    );
  };

  // Requirement entfernen
  const handleRemoveRequirement = (idx: number) => {
    setRequirements(reqs => reqs.filter((_, i) => i !== idx));
  };

  // Spezifikation speichern
  const handleSaveSpec = () => {
    setSpecRows(rows => [
      ...rows,
      {
        id: Date.now(),
        name: specName,
        applicabilityType,
        ifcVersion,
        requirements,
        ifcClass: applicabilityType === "type" ? ifcClass : undefined,
      },
    ]);
    setSpecName("");
    setApplicabilityType("type");
    setIfcVersion("IFC4");
    setRequirements([]);
    setIfcClass("");
    setAddRowMode(false);
  };

  // Spezifikation löschen
  const handleRemoveSpec = (id: number) => {
    setSpecRows(rows => rows.filter(r => r.id !== id));
  };

  return (
    <Container>
      {/* Überschrift der Seite ganz oben */}
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          <T keyName="ids_export.title">Information Delivery Specification</T>
        </Typography>
      </Box>
      {/* Add Specification Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddRowMode(true)}
          disabled={addRowMode}
        >
          Add Specification
        </Button>
      </Box>

      {/* Inline Spezifikationszeilen */}
      <Box sx={{ mb: 3 }}>
        {specRows.map(row => (
          <Paper key={row.id} sx={{ mb: 2, p: 2, background: "#f7f7f7", position: "relative" }}>
            <IconButton
              aria-label="remove"
              onClick={() => handleRemoveSpec(row.id)}
              size="small"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {row.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Applicability: {row.applicabilityType === "type" ? "Type (IFC Klasse)" : row.applicabilityType}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              IFC Version: {row.ifcVersion}
            </Typography>
            {row.applicabilityType === "type" && row.ifcClass && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                IFC Klasse: {row.ifcClass}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mb: 1 }}>
              Requirements:
              {row.requirements.length === 0 && <em> Keine</em>}
              {row.requirements.map((req, idx) => (
                <span key={idx} style={{ marginLeft: 8 }}>
                  [{req.type.charAt(0).toUpperCase() + req.type.slice(1)}] {Array.isArray(req.value) ? req.value.join(", ") : req.value}
                  {idx < row.requirements.length - 1 ? "," : ""}
                </span>
              ))}
            </Typography>
          </Paper>
        ))}
        {addRowMode && (
          <Paper sx={{ mb: 2, p: 2, position: "relative" }}>
            <IconButton
              aria-label="close"
              onClick={() => setAddRowMode(false)}
              size="small"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Name der Specification"
                value={specName}
                onChange={e => setSpecName(e.target.value)}
                fullWidth
                autoFocus
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Applicability (Anwendbarkeit)
            </Typography>
            <RadioGroup
              row
              value={applicabilityType}
              onChange={e => setApplicabilityType(e.target.value as any)}
            >
              <FormControlLabel value="type" control={<Radio />} label="Type (IFC Klasse)" />
            </RadioGroup>
            {/* IFC Klasse Feld nur wenn Applicability "type" */}
            {applicabilityType === "type" && (
              <Box sx={{ mt: 2, mb: 2, position: "relative" }}>
                <TextField
                  label="IFC Klasse"
                  placeholder="Bitte IFC Klasse eingeben (z.B. IFCWALL)"
                  value={ifcClass}
                  onChange={e => setIfcClass(e.target.value.toUpperCase())}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  onBlur={() => setTimeout(() => setShowIfcSuggestions(false), 150)}
                  onFocus={() => {
                    if (ifcClass.length >= 4 && ifcSuggestions.length > 0) setShowIfcSuggestions(true);
                  }}
                  InputProps={{
                    endAdornment: (
                      showIfcSuggestions && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            bgcolor: "background.paper",
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            boxShadow: 2,
                            mt: 0.5,
                            maxHeight: 220,
                            overflowY: "auto"
                          }}
                        >
                          {ifcSuggestions.map(s => (
                            <MenuItem
                              key={s}
                              onMouseDown={e => {
                                e.preventDefault();
                                setIfcClass(s);
                                setShowIfcSuggestions(false);
                              }}
                            >
                              {s}
                            </MenuItem>
                          ))}
                        </Box>
                      )
                    )
                  }}
                />
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Requirements
            </Typography>
            <FormGroup>
              {requirements.map((req, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1, position: "relative" }}>
                  <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel id={`req-type-label-${idx}`}>Bitte Facette wählen</InputLabel>
                    <Select
                      size="small"
                      labelId={`req-type-label-${idx}`}
                      value={req.type}
                      label="Bitte Facette wählen"
                      onChange={e => handleRequirementTypeChange(idx, e.target.value as any)}
                    >
                      <MenuItem value="classification">Classification</MenuItem>
                      <MenuItem value="attribute">Attribute</MenuItem>
                    </Select>
                  </FormControl>
                  {/* Classification Auswahl */}
                  {req.type === "classification" ? (
                    <Box sx={{ flex: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel id={`model-dropdown-label-req-${idx}`}>Klassifikationssystem auswählen</InputLabel>
                        <Select
                          labelId={`model-dropdown-label-req-${idx}`}
                          value={req.value}
                          label="Fachmodell auswählen"
                          onChange={e => handleRequirementChange(idx, e.target.value)}
                        >
                          <MenuItem value="">
                            <em>Fachmodell aus datacat auswählen</em>
                          </MenuItem>
                          {modelOptions.map(opt => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  ) : req.type === "attribute" ? (
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* 1. Fachmodell-Auswahl */}
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel id={`model-dropdown-label-attr-${idx}`}>Fachmodell auswählen</InputLabel>
                        <Select
                          labelId={`model-dropdown-label-attr-${idx}`}
                          value={req.modelId || ""}
                          label="Fachmodell auswählen"
                          onChange={e => handleRequirementChange(idx, [], e.target.value)}
                        >
                          <MenuItem value="">
                            <em>Fachmodell auswählen</em>
                          </MenuItem>
                          {modelOptions.map(opt => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* 2. Klassen-Auswahl mit Autocomplete Mehrfachauswahl und Suche */}
                      {req.modelId && (
                        <Autocomplete
                          multiple
                          fullWidth
                          disableCloseOnSelect
                          options={allClassOptions.filter(opt => opt.modelId === req.modelId)}
                          getOptionLabel={opt =>
                            `${opt.name}${opt.groupName ? ` (${opt.groupName})` : ""}${opt.modelName ? ` [${opt.modelName}]` : ""}`
                          }
                          value={allClassOptions.filter(opt => Array.isArray(req.value) && req.value.includes(opt.id))}
                          onChange={(_, newValues) => {
                            handleRequirementChange(idx, newValues.map(v => v.id), req.modelId);
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Klassen aus datacat auswählen"
                              placeholder="Klasse(n) suchen..."
                              variant="outlined"
                            />
                          )}
                          renderOption={(props, option, { selected }) => (
                            <li {...props} key={option.id}>
                              <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="body2">
                                  {option.name}
                                  {option.groupName && (
                                    <Typography
                                      variant="caption"
                                      component="span"
                                      sx={{ ml: 1, color: "text.secondary" }}
                                    >
                                      ({option.groupName})
                                    </Typography>
                                  )}
                                  {option.modelName && (
                                    <Typography
                                      variant="caption"
                                      component="span"
                                      sx={{ ml: 1, color: "text.secondary" }}
                                    >
                                      [{option.modelName}]
                                    </Typography>
                                  )}
                                </Typography>
                              </Box>
                            </li>
                          )}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                      )}
                    </Box>
                  ) : null}
                  <IconButton
                    aria-label="remove"
                    onClick={() => handleRemoveRequirement(idx)}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={handleAddRequirement}
                sx={{ mt: 1 }}
              >
                Requirement hinzufügen
              </Button>
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              IFC Version
            </Typography>
            <FormControl fullWidth>
              <Select
                value={ifcVersion}
                label="IFC Version"
                onChange={e => setIfcVersion(e.target.value)}
              >
                <MenuItem value="IFC2X3">IFC2X3</MenuItem>
                <MenuItem value="IFC4">IFC4</MenuItem>
                <MenuItem value="IFC4X3">IFC4X3</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                onClick={() => setAddRowMode(false)}
                color="secondary"
                sx={{ mr: 1 }}
              >
                Abbrechen
              </Button>
              <Button
                onClick={handleSaveSpec}
                variant="contained"
                disabled={!specName || (applicabilityType === "type" && !ifcClass)}
              >
                Speichern
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default IDSExportView;
