import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setAuthentication } from '@store/reducers/auth';
import { setWindowClass } from '@app/utils/helpers';
import { PfCheckbox, PfButton } from '@profabric/react-components';
import * as Yup from 'yup';

import {
  authLogin,
} from '@app/utils/oidc-providers';
import { Form, InputGroup } from 'react-bootstrap';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = React.useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (password: string, api: string) => {
    try {
      setAuthLoading(true);

      const response = await authLogin(password, api);
      dispatch(setAuthentication(response as any));
      toast.success('Login is succeed!');
      setAuthLoading(false);
      // dispatch(loginUser(token));
      navigate('/');
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      api: 'http://localhost:8080',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      login(values.password, values.api);
    },
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>PY</b>
            <span>HSS</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t<string>('login.label.signIn')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="api"
                  name="api"
                  type="input"
                  placeholder="API Url"
                  onChange={handleChange}
                  value={values.api}
                  isValid={touched.api && !errors.api}
                  isInvalid={touched.api && !!errors.api}
                />
                {touched.api && errors.api ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.api}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-sitemap" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="API Key"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-8">
                <PfCheckbox checked={false}>
                  {t<string>('login.label.rememberMe')}
                </PfCheckbox>
              </div>
              <div className="col-4">
                <PfButton
                  block
                  type="submit"
                  loading={isAuthLoading}
                >
                  {t<string>('login.button.signIn.label')}
                </PfButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
