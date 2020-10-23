import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";

export default function CommodityTypesTable(props) {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { rows, total_count, onEditClick } = props;

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={"name"} align={"left"} style={{ fontSize: '25px' }}>
                Types of Commodity
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.onCreateClick();
                  }}
                >
                  Create
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell key={row.id}>
                        {row.name}
                        <Button
                          style={{ float: "right" }}
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            onEditClick(row.id, row.name);
                          }}
                        >
                          edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={total_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
};
