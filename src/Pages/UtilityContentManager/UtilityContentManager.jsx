import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import DeleteModal from '../../Components/DeleteModal'
import Loader from "../../Components/Loader";
import AddUtilityContentModal from "../../Components/UtilityContentManager/AddUtilityContentModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllUtilityContents } from "../../redux/actions/commonAction";


const UtilityContentManager = () => {
    const serviceProviderRoot = useSelector(store => store.root)
    const { loader, utilityContents } = serviceProviderRoot
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [addUtilityContentModal, setAddUtilityContentModal] = useState(false)

    const clickHandler1 = () => {
        setAddUtilityContentModal(true)
    }

    const deleteHandler = (d) => {
        const temp_data = {
            _id: d._id,
            name: d.contentType,
            actionType: "delete_utility_content",
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    useEffect(() => {
        dispatch(getAllUtilityContents())
    }, [])

    return (
        <>
            {addUtilityContentModal && <AddUtilityContentModal
                addUtilityContentModal={addUtilityContentModal}
                setAddUtilityContentModal={setAddUtilityContentModal}
            />}

            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}

            <Container>
                <Row className="my-2">
                    <Col md={2} >
                        <Button onClick={clickHandler1}>
                            ADD
                        </Button>
                    </Col>
                    {/* <Col md={3} >
                        <Form.Group >
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={(e) => setCity(e.target.value)} as="select">
                                <option>Select</option>
                                {cities.length !== 0 ? cities.map(c =>
                                    <option value={c.name}>{c.name}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                    </Col> */}
                </Row>
                <Row>
                    {loader ? <Loader /> : <>
                        {utilityContents.length === 0 ? <h5>Not found.</h5> : <>
                            <Col  >
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="text-center">S.No</th>
                                            <th className="text-center">Picture</th>
                                            <th className="text-center">Content Type</th>
                                            <th className="text-center">Title</th>
                                            <th className="text-center">Index</th>
                                            <th className="text-center">Redirection Url</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {utilityContents.map((b, index) =>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <img width="100%" height="10%" src={b.picture} />
                                                <td className="text-center">{b.contentType}</td>
                                                <td className="text-center">{b.title}</td>
                                                <td className="text-center">{b.index}</td>
                                                <td className="text-center">{b.redirectionUrl}</td>
                                                <td className="text-center"><Button onClick={() => deleteHandler(b)} variant="outline-info">Delete</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </>}
                    </>}
                </Row>
            </Container>
        </>
    )
}

export default UtilityContentManager
