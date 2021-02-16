import { List, ListItem, Button } from "@chakra-ui/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const Pagination = ({ currentPage, rowsPerPage, totalRows, paginate }) => {
    const lastPage = Math.ceil(totalRows / rowsPerPage)
    let startCount = ((currentPage - 1) * rowsPerPage) + 1
    let endCount = (totalRows / currentPage) < rowsPerPage ? ((currentPage - 1) * rowsPerPage) + (totalRows % rowsPerPage) : ((currentPage - 1) * rowsPerPage) + rowsPerPage

    return (
        <List display="flex" marginTop={4} overflowX={["scroll", "scroll", "hidden"]} overflowY="hidden" alignItems="baseline">
            <ListItem>Showing {startCount}-{endCount} of {totalRows}</ListItem>
            <ListItem >
                <Button
                    disabled={currentPage === 1 || totalRows < 1}
                    onClick={() => paginate(currentPage - 1)}
                    bg='#a0aec0'
                    mx={1}
                    h="1.5rem"
                >
                    <HiOutlineChevronLeft />
                </Button>
            </ListItem>
            <ListItem >
                <Button
                    disabled={currentPage === lastPage || totalRows < 6}
                    onClick={() => paginate(currentPage + 1)}
                    bg='#a0aec0'
                    mx={1}
                    h="1.5rem"
                >
                    <HiOutlineChevronRight />
                </Button>
            </ListItem>
        </List>
    );
};

export default Pagination;
