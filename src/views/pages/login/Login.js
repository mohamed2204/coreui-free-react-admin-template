import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [validated, setValidated] = useState(false)
  const [details, setDetails] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    // const name = e.target.name
    // const value = e.target.value
    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const submitHandler = (e) => {
    const data = new FormData(e.target)
    console.log('data', data.values())
    console.log(e.target.values, 'h')
    e.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(details)

    const form = e.currentTarget
    console.log(form)
    console.log(form.checkValidity() === false)

    // const data = new FormData(form)
    // console.log('data', data.values())
    // console.log(e.target.values, 'hi')

    if (form.checkValidity() === false) {
      //e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
  }
  /* const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const getUsers = useCallback((value = '') => {
    setLoading(true)
    fetch(`https://apitest.coreui.io/demos/users?first_name=${name}`)
      .then((response) => response.json())
      .then((result) => {
        setUsers(
          result.records.map((record) => {
            return {
              value: record.id,
              label: record.first_name,
            }
          }),
        )
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    getUsers()
  }, [getUsers]) */
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="row g-3 needs-validation"
                    method="post"
                    encType="multipart/form-data"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CFormLabel htmlFor="validationTooltipUsername"></CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        type="text"
                        id="validationTooltipUsername"
                        required
                        placeholder="Username"
                        autoComplete="username"
                        defaultValue=""
                        onChange={handleChange}
                      />
                      <CFormFeedback tooltip valid>
                        Looks good!
                      </CFormFeedback>
                    </CInputGroup>
                    <CFormLabel htmlFor="validationTooltipPassword"></CFormLabel>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="validationTooltipPassword"
                        required
                        defaultValue=""
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-4">
                      <CMultiSelect
                        label="Users"
                        loading={loading}
                        onFilterChange={(value) => getUsers(value)}
                        options={users}
                        text="Please select your user."
                        search="external"
                        virtualScroller
                      />
                    </CInputGroup> */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
