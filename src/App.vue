<template>
  <div>
    <PathSelector/>
    <component
      id="full_div"
      :is="currentView"/>
  </div>
</template>

<script>
import Map from './components/Map';
import PathSelector from './components/PathSelector'

export default {
  name: 'App',
  components: {
    Map,
    PathSelector
  },
  data () {
    return {
      currentView: 'Map'
    };
  }
};
</script>

<style>
.leaflet-fake-icon-image-2x {
  background-image: url(../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../node_modules/leaflet/dist/images/marker-shadow.png);
}
@import "../node_modules/leaflet/dist/leaflet.css";
body {
  margin: 0px;
  font-family: Helvetica, Verdana, sans-serif;
}
#full_div {
  position: absolute;
  overflow-x: auto;
  top: 0;
  right: 0;
  left: 30%;
  bottom: 0;
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
</style>
