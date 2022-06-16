import MUIDataTable, { TableBodyCell } from "mui-datatables";
import { TableContainer, TableHead, Paper, TableBody, Card, TableRow, TableCell, List, ListItem, ListItemAvatar, ListItemText, CircularProgress, Box, Typography, Chip, Table } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Face, Place, EmojiEmotions, DirectionsWalk, CompareArrows } from '@material-ui/icons';
import React from "react";
import { CrystalBall, RayStartArrow } from "mdi-material-ui";
const columns = ["Title", { name: "Time", options: { align: 'center' } }, { name: "#Questions", options: { align: 'center' } }, { name: "Accuracy", options: { align: 'center', customBodyRender: (value, tableMeta, updateValue) => (<CircularProgressWithLabel value={value} />) } }];

const data = [
    ["Three Bears in a Boat", "30min", 28, 67],
    ["Chris P. Bacon", "25min", 23, 83]
];

const createQAData = (status, question, answer, kid_answer, label) => {
    return { status, question, answer, kid_answer, label };
}

const rows = [
    createQAData(1, "Where was Chris taken to?", "The veterinarian's office.", "veterinarian's office", "Place"),
    createQAData(1, "What is unique about the pig?", "His back legs.", "his legs", "Action"),
    createQAData(1, "Who is Duma?", "A cat.", "a cat", "Character"),
    createQAData(0, "Who welcomed Chris with hugs and kisses?", "Dr. Len's family.", "the man", "Character"),
    createQAData(0, "What happened when dad shouted, look at Chris?", "He popped his head up.", "don't know", "Outcome"),
    createQAData(1, "What will they have together", "A good life.", "a happy life", "Prediction"),
    createQAData(1, "What is the main point of this story?", "If you think positive, who knows what you can do.", "positive is power", "Outcome"),
]

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const options = {
    responsive: "scroll",
    elevation: 0,
    selectableRows: false,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    rowsExpanded: [1],
    renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        return (
            <React.Fragment>
                <tr>
                    <td colSpan={6}>
                        <TableContainer component={Box}>
                            <Table size="small" style={{ minWidth: "650" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell ><Typography style={{ fontSize: 12 }}> Question</Typography></TableCell>
                                        <TableCell ><Typography style={{ fontSize: 12 }}>Standard/Kid's Answer</Typography></TableCell>
                                        <TableCell ><Typography style={{ fontSize: 12 }}>Category</Typography></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow>
                                            <TableCell>
                                                <FiberManualRecordIcon color={row.status ? "primary" : "secondary"} style={{ fontSize: 12 }} />
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{ fontSize: 12 }}>
                                                    {row.question}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{ fontSize: 12 }} display="block" variant="body" color="textSecondary">
                                                    {row.answer}</Typography>
                                                <Typography style={{ fontSize: 12 }} display="block" variant="body" color="textPrimary">
                                                    {row.kid_answer}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip size="small" style={{ fontSize: 12 }} label={row.label} icon=
                                                    {
                                                        row.label === "Place" ? <Place /> :
                                                            row.label === "Charcter" ? <Face /> :
                                                                row.label === "Outcome" ? <RayStartArrow /> :
                                                                    row.label === "Prediction" ? <CrystalBall /> :
                                                                        row.label === "Action" ? <DirectionsWalk /> : <EmojiEmotions />
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>

                                    ))}

                                </TableBody>


                            </Table>
                        </TableContainer>
                    </td>
                </tr>
            </React.Fragment >

        );
    },
    pagination: false,
    filter: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: false,
    title: false,
    setTableProps: () => {
        return {
            // material ui v4 only
            size: 'small',
        };
    },
};

export default function SessionTable() {
    return (
        <Card variant="outlined" mt={2}>
            <MUIDataTable
                // title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
            />
        </Card>)
}