// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableHead,
//   Box,
// } from "@mui/material";
// import { useGetOrderQuery } from "@/redux/services/ordersApi"; 

// interface Props {
//   orderId: string;
// }

// const OrderCard: React.FC<Props> = ({ orderId }) => {
//   const { data, error, isLoading, isFetching } = useGetOrderQuery({ orderId });

//   if (error) return <Alert severity="error">Failed to load order</Alert>;
//   if (!data) return <Alert severity="warning">No order found</Alert>;

//   // Show loader while fetching
//   if (isLoading || isFetching) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "300px",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const order = data;

//   return (
//     <Card sx={{ maxWidth: 600, margin: "0 auto", borderRadius: 3, boxShadow: 1 }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Order ID: {order.order_id}
//         </Typography>

//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell colSpan={2}>
//                 <Typography variant="h6">Order Details</Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell><b>Line No</b></TableCell>
//               <TableCell>{order.line_no}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Customer</b></TableCell>
//               <TableCell>{order.customer_id}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>SKU</b></TableCell>
//               <TableCell>{order.sku}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Product Name</b></TableCell>
//               <TableCell>{order.product_name}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Item Type</b></TableCell>
//               <TableCell>{order.item_type}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Brand</b></TableCell>
//               <TableCell>{order.brand}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Collection</b></TableCell>
//               <TableCell>{order.collection}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Quantity</b></TableCell>
//               <TableCell>{order.quantity}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Amount</b></TableCell>
//               <TableCell>${order.amount}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default OrderCard;
