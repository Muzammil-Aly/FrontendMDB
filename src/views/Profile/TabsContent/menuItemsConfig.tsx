import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InventoryIcon from "@mui/icons-material/Inventory";

const menuItemsConfig = [
  {
    key: "Profile Information",
    label: "Profile Information",
    icon: <InfoIcon />,
  },
  {
    key: "Customer Profiles",
    label: "Customer Profiles",
    icon: <PeopleIcon />,
  },
  {
    key: "Orders",
    label: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    key: "Support Tickets",
    label: "Support Tickets",
    icon: <SupportAgentIcon />,
  },
  {
    key: "Inventory",
    label: "Inventory",
    icon: <InventoryIcon />,
  },
];

export default menuItemsConfig;
