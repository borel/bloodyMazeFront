<template>
  <div>
    <div>
      <h3>Select your path </h3>
    </div>
      <div style="width: 25%">
        <basic-select :options="startingPoints"
                  :selected-option="startingPointItem"
                  placeholder="Starting Point"
                  @select="onSelectStartingPoint">
        </basic-select>
      </div>
      <br>
      <div style="width: 25%">
        <basic-select :options="endingPoints"
                  :selected-option="endingPointItem"
                  placeholder="Ending Point"
                  @select="onSelectEndingPoint">
        </basic-select>
      </div>
      <br>
      <button
        name="button"
        @click="getPaths">Get path
      </button>
      <button
        name="button"
        @click="reset">Reset
      </button>
      <br>
      <br>
      <div style="width: 28%">
        <table border="1">
          <th> Order </th>
          <th> Name </th>
          <th> Distance  </th>
          <th> Distance depuis le début </th>
          <tr v-for="(marker, index) in markers" :key="marker.id">
            <td> {{ index + 1 }} </td>
            <td> {{ marker.tooltip }} </td>
            <td> {{ marker.distance }} </td>
            <td> {{ marker.distance_from_begining }} </td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { BasicSelect } from "vue-search-select";
import { mapMutations } from 'vuex'

export default {
  name: "PathSelector",
  components: {
    BasicSelect
  },
  created() {
    axios.get("http://localhost:8080/select")
      .then(response => {
        this.startingPoints = response.data;
        this.endingPoints = response.data;
      });
  },
  data() {
    return {
      startingPoints: null,
      startingPointItem: {
        value: "",
        text: ""
      },
      endingPoints: null,
      endingPointItem: {
        value: "",
        text: ""
      },
      shortestPaths: null
    };
  },
  computed: {
    markers () {
      return this.$store.state.paths
    }
  },
  methods: {
    ...mapMutations({
      paths: 'PATHS'
    }),
    reset() {
      this.startingPointItem = {};
      this.endingPointItem = {};
      this.paths([])
    },
    onSelectStartingPoint(item) {
      this.startingPointItem = item;
    },
    onSelectEndingPoint(item) {
      this.endingPointItem = item;
    },
    getPaths(){
      if(this.startingPointItem && this.startingPointItem.value && this.endingPointItem && this.endingPointItem.value) {
        axios.get(`${process.env.BLOODY_MAZE_API_URL}/path?from=${this.startingPointItem.value}&to=${this.endingPointItem.value}`)
        .then( response => {
          this.paths(response.data)
        })
      }
    }
  }
};
</script>
<style>
button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  color: #333;
  background-color:#fff;
  border-radius: 4px;
  font-size: 14px;
}
</style>
