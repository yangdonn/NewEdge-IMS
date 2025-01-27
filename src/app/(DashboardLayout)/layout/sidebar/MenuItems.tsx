import {
  IconLayoutDashboard,
  IconShoppingCart,
  IconAlignBoxBottomCenter,
  IconBox,
  IconCheckupList,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
   {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Inventory",
    icon: IconShoppingCart,
    href: "/Inventory",
  },
  {
    id: uniqueId(),
    title: "Report",
    icon: IconAlignBoxBottomCenter,
    href: "/Report",
  },
  {
    id: uniqueId(),
    title: "Purchase Orders",
    icon: IconBox,
    href: "/PurchaseOrders",
  },
  {
    id: uniqueId(),
    title: "Sales Invoice",
    icon: IconCheckupList,
    href: "/SalesInvoice",
  },
  

];

export default Menuitems;
