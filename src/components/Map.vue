<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 100%">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
       <l-marker
        v-for="marker in markers"
          :key="marker.id"
          :lat-lng="marker.position"
          :icon="marker.icon"
          @click="alert(marker)">
            <l-tooltip :content="marker.tooltip" />
        </l-marker>
    </l-map>
  </div>
</template>

<script>
import axios from "axios";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import { mapGetters } from 'vuex'

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      zoom: 13,
      center: L.latLng(45.75826204300019, 4.83043945355408),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    markers () {
      // Add the rank to the marker
      this.$store.state.paths.forEach( (marker, index) => {
        marker.icon =  L.icon.glyph({
            prefix: '',
            glyph: index + 1,
            glyphColor: 'red'})
      })
      // Center the map on first marker
      if(this.$store.state.paths && this.$store.state.paths[0]){
        this.center =  L.latLng(this.$store.state.paths[0].position.lat, this.$store.state.paths[0].position.lng)
      }
      return this.$store.state.paths
    }
  }
};
</script>
