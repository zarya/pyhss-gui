import {SmallBox} from '@app/components';
import React from 'react';
import {ContentHeader} from '@components';
import {NavLink} from 'react-router-dom';
import i18n from '@app/utils/i18n';

import {OamApi} from "../services/pyhss";

const Dashboard = () => {
  const [subs, setSubs] = React.useState("0");
  const [subsIms, setSubsIms] = React.useState("0");
  const [subsPcrf, setSubsPcrf] = React.useState("0");
  const [diameter, setDiameter] = React.useState("0");

  React.useEffect(() => {
    OamApi.servingSubs().then((data => {
      setSubs(String(Object.keys(data.data).length));
    }))
    OamApi.servingSubsIms().then((data => {
      setSubsIms(String(Object.keys(data.data).length));
    }))
    OamApi.servingSubsPcrf().then((data => {
      setSubsPcrf(String(Object.keys(data.data).length));
    }))
    OamApi.diameterPeers().then((data => {
      setDiameter(String(Object.keys(data.data).length));
    }))
  }, []);

  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{subs}</h3>

                  <p>{i18n.t('dashboard.subscriberHeader')}</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <NavLink to="/subscriber" className="small-box-footer">
                  {i18n.t('generic.moreInfo')} <i className="fas fa-arrow-circle-right" />
                </NavLink>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{subsIms}</h3>

                  <p>{i18n.t('dashboard.imsSubscriberHeader')}</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <NavLink to="/imssubscriber" className="small-box-footer">
                  {i18n.t('generic.moreInfo')} <i className="fas fa-arrow-circle-right" />
                </NavLink>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{subsPcrf}</h3>

                  <p>{i18n.t('dashboard.subscribersPCRFHeader')}</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{diameter}</h3>

                  <p>{i18n.t('dashboard.diameterPeersHeader')}</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
