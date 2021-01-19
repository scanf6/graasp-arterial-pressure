import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import StimulIcon from '@material-ui/icons/FlashOn';
import PropTypes from 'prop-types';
import { stimulNerfPneumogastrique, stimulNerfSympatique } from '../actions';
import './Experiences.css';

class StimulationExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dispatchStimulNerfPneumogastrique, dispatchStimulNerfSympatique } = this.props;

    return (
      <div id="stimulationExperience" className="experiencesContainer">
        <div className="title">Experiences de Stimulation</div>
        <div className="content">
          <div style={{ marginBottom: '1rem' }}>
            <Button className="sectionSwitchBtn" variant="contained" color="primary" onClick={dispatchStimulNerfPneumogastrique}><StimulIcon fontSize="small" /></Button>
Stimulation du nerf pneumogastrique
          </div>
          <div>
            <Button className="sectionSwitchBtn" variant="contained" color="primary" onClick={dispatchStimulNerfSympatique}><StimulIcon fontSize="small" /></Button>
Stimulation du nerf sympatique
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  dispatchStimulNerfPneumogastrique: stimulNerfPneumogastrique,
  dispatchStimulNerfSympatique: stimulNerfSympatique,
};

StimulationExperiences.propTypes = {
  dispatchStimulNerfPneumogastrique: PropTypes.func.isRequired,
  dispatchStimulNerfSympatique: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(StimulationExperiences);
