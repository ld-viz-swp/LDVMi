import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { PromiseStatus } from '../../../../ducks/promises'
import PromiseResult from '../../../../misc/components/PromiseResult'
import { Property } from '../models'
import { skosConceptsSelector, createSkosConceptsStatusSelector } from '../ducks/skosConcepts'
import { skosConceptsCountsSelector, createSkosConceptsCountsStatusSelector } from '../ducks/skosConceptsCounts'
import { filterConfigsSelector } from '../ducks/filterConfigs'
import { configureFilter } from '../ducks/filterConfigs'
import FilterConfig from '../components/FilterConfig'

const PropertyFilter = (props) => {
  const { dispatch, property, filterConfigs, skosConcepts, skosConceptsCounts, status, countsStatus } = props;

  if (!status.done) {
      return <PromiseResult status={status} />;
  }

  return <div>
    {skosConcepts.map(skosConcept =>
      <FilterConfig
        key={skosConcept.uri}
        skosConcept={skosConcept}
        count={skosConceptsCounts.get(skosConcept.uri)}
        countLoading={countsStatus.isLoading}
        configureFilter={settings => dispatch(configureFilter(property.uri, skosConcept.uri, settings))}
        config={filterConfigs.get(skosConcept.uri)}
      />
    )}
  </div>;
};

PropertyFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  property: PropTypes.instanceOf(Property).isRequired,
  filterConfigs: PropTypes.instanceOf(Map).isRequired,
  skosConcepts: PropTypes.instanceOf(List).isRequired,
  skosConceptsCounts: PropTypes.instanceOf(Map).isRequired,
  status: PropTypes.instanceOf(PromiseStatus).isRequired,
  countsStatus: PropTypes.instanceOf(PromiseStatus).isRequired
};

const propertySelector = (state, props) => props.property;

const skosConceptsStatusSelector = createSkosConceptsStatusSelector(
  (state, props) => props.property.schemeUri);

const skosConceptsCountsStatusSelector = createSkosConceptsCountsStatusSelector(
  (state, props) => props.property.uri);

const selector = createSelector(
  [propertySelector, filterConfigsSelector,
    skosConceptsSelector, skosConceptsCountsSelector,
    skosConceptsStatusSelector, skosConceptsCountsStatusSelector],
  (property, filterConfigs, skosConcepts, skosConceptsCounts, status, countsStatus) => ({
    property,
    filterConfigs: filterConfigs.get(property.uri) || Map(),
    skosConcepts: skosConcepts.get(property.schemeUri) || List(),
    skosConceptsCounts: skosConceptsCounts.get(property.uri) || Map(),
    status,
    countsStatus
  })
);

export default connect(selector)(PropertyFilter);
