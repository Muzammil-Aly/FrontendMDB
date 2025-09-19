// import React, { useState } from "react";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import { Tooltip, IconButton, Snackbar } from "@mui/material";
// import { ICellRendererParams } from "ag-grid-community";

// const CopyCellRenderer: React.FC<ICellRendererParams> = (props) => {
//   const [open, setOpen] = useState(false);
//   const [hover, setHover] = useState(false);

//   const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
//     // Stop React and AG Grid events
//     e.stopPropagation();
//     e.preventDefault();
//     e.nativeEvent.stopImmediatePropagation();

//     if (props.value !== undefined && props.value !== null) {
//       navigator.clipboard.writeText(String(props.value)).then(() => {
//         setOpen(true); // Or toast.success("Copied!");
//       });
//     }
//   };

//   return (
//     <div
//       onClick={(e) => e.stopPropagation()}
//       style={{ display: "flex", alignItems: "center" }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <span>{props.value}</span>

//       {hover && (
//         <Tooltip title="Copy to clipboard">
//           <IconButton
//             size="small"
//             onClick={handleCopy}
//             style={{ marginLeft: 4 }}
//           >
//             <ContentCopyIcon fontSize="inherit" />
//           </IconButton>
//         </Tooltip>
//       )}

//       <Snackbar
//         open={open}
//         autoHideDuration={1500}
//         onClose={() => setOpen(false)}
//         message="Copied to clipboard!"
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         sx={{ zIndex: 9999 }}
//       />
//     </div>
//   );
// };

// export default CopyCellRenderer;

import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import { ICellRendererParams } from "ag-grid-community";
import "./ResponsiveDashbord.css";

const CopyCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const [hover, setHover] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Stop React and AG Grid events
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    if (props.value !== undefined && props.value !== null) {
      navigator.clipboard.writeText(String(props.value)).then(() => {
        toast.success("Copied to clipboard!");
      });
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span>{props.value}</span>

      {hover && (
        <Tooltip title="Copy to clipboard">
          <IconButton
            size="small"
            onClick={handleCopy}
            style={{ marginLeft: 4 }}
            className="no-drag"
          >
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default CopyCellRenderer;
