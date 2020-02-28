<template>
  <div class="search">
    <Spinner
      class="centered"
      v-if="loading"
    ></Spinner>
    <GradientBackground :color="'blue'" />
    <div class="filters">
      <Dropdown
        :values="parameters.defaults.sort_by"
        :value="parameters.sort_by"
        :label="'Sort by'"
        class="dropdown-btn"
        @valuechange="onSearchSortChange"
      />
      <Dropdown
        :values="parameters.defaults.date"
        :value="parameters.date"
        :label="'Date'"
        :noDefault="true"
        class="dropdown-btn"
        @valuechange="onSearchDateChange"
      />
      <Dropdown
        :values="parameters.defaults.duration"
        :value="parameters.duration"
        :label="'Duration'"
        :noDefault="true"
        class="dropdown-btn"
        @valuechange="onSearchDurationChange"
      />
      <Dropdown
        :values="parameters.defaults.type"
        :value="parameters.type"
        :label="'Type'"
        class="dropdown-btn"
        @valuechange="onSearchTypeChange"
      />
    </div>
    <div
      v-if="!loading"
      class="search-videos-container"
    >
      <component
        v-for="result in results"
        :is="getListEntryType(result.type)"
        :key="result.videoId"
        :video="result"
        :playlist="result"
        :channel="result"
      />
      <a
        class="badge-btn"
        href="#"
        @click.prevent="loadMoreVideos"
      >show more</a>
    </div>
  </div>
</template>

<script>
import Commons from '@/plugins/commons.js'
import VideoEntry from '@/components/list/VideoEntry'
import PlaylistEntry from '@/components/list/PlaylistEntry'
import ChannelEntry from '@/components/list/ChannelEntry'
import Spinner from '@/components/Spinner'
import BottomNavigation from '@/components/BottomNavigation'
import GradientBackground from '@/components/GradientBackground.vue'
import Dropdown from '@/components/filter/Dropdown'
import SearchParams from '@/plugins/services/searchParams'
import Invidious from '@/plugins/services/invidious'

export default {
  name: 'search',
  components: {
    VideoEntry,
    Spinner,
    PlaylistEntry,
    ChannelEntry,
    BottomNavigation,
    GradientBackground,
    Dropdown
  },
  watchQuery: true,
  data: () => ({
    results: [],
    loading: false,
    searchQuery: null,
    parameters: SearchParams,
    page: 1
  }),
  methods: {
    getListEntryType(type) {
      if (type === 'video') {
        return 'VideoEntry'
      } else if (type === 'playlist') {
        return 'PlaylistEntry'
      } else if (type === 'channel') {
        return 'ChannelEntry'
      }
    },
    reloadSearchWithParams() {
      const searchParams = SearchParams.getParamsString()
      this.$router.push(
        `/results?search_query=${this.searchQuery}${searchParams}`
      )
    },
    onSearchSortChange(element, index) {
      SearchParams.sort_by = element.value
      this.reloadSearchWithParams()
    },
    onSearchDateChange(element, index) {
      SearchParams.date = element.value
      this.reloadSearchWithParams()
    },
    onSearchDurationChange(element, index) {
      SearchParams.duration = element.value
      this.reloadSearchWithParams()
    },
    onSearchTypeChange(element, index) {
      SearchParams.type = element.value
      this.reloadSearchWithParams()
    },
    loadMoreVideos() {
      let me = this
      this.page += 1
      SearchParams.page = this.page
      const searchParams = SearchParams.getParamsJson(this.searchQuery)
      Invidious.api.search({ params: searchParams })
        .then(response => {
          me.results = me.results.concat(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  asyncData({ query }) {
    const searchParams = SearchParams.parseQueryJson(query, query.search_query)
    return Invidious.api.search({ params: searchParams })
      .then(response => {
        return { results: response.data, searchQuery: query.search_query }
      })
      .catch(error => {
        console.error(error)
      })
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
}
</script>

<style lang="scss">
.search {
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  .filters {
    width: 100%;
    max-width: $main-width;
    padding: 10px 15px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;

    .dropdown-btn {
      z-index: 20;
      margin: 0 10px 0 0;
    }
  }

  .search-videos-container {
    width: 100%;
    height: 100%;
    max-width: $main-width;
    margin: 0 auto;
    z-index: 10;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    @media screen and (max-width: $mobile-width) {
      flex-direction: row;
    }
  }
}
</style>