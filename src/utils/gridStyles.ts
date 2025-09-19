export const getRowStyle = (highlightedId?: string | number | null) => {
  return (params: any) => {
    if (highlightedId != null && highlightedId === params.data.customer_id) {
      return {
        backgroundColor: "#E0E0E0",
        color: "#fff",
        fontWeight: 600,
      };
    }
    return params.node.rowIndex % 2 === 0
      ? { backgroundColor: "#f9f9f9" }
      : { backgroundColor: "#ffffff" };
  };
};
