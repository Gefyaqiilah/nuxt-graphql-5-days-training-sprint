<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Members
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchItem"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
          @click:clear="handleGetMembers()"
          @keyup.enter="handleSearchMember()"
        />
        <v-spacer />
        <v-btn color="teal" outlined @click="showDialogCreate = true">
          Create Member
        </v-btn>
      </v-card-title>

      <v-card-text class="p-0">
        <v-data-table
          :headers="table.tableHeaders"
          :items="tableItems"
          :options.sync="optionsTable"
          :loading="table.loading"
          :server-items-length="4"
          class="elevation-1"
          :search="searchItem"
        >
          <template #item.action="{ item }">
            <v-btn
              color="blue-grey"
              x-small
              outlined
              class="ma-5 white--text"
              @click="handleGetMemberById(item.id)"
            >
              <v-icon small center dark>mdi-eye-settings </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <DetailMember
      :member="member"
      :dialog="showDialogView"
      :tasks="tasks"
      @dialog="showDialogView = $event"
    />
    <CreateMember
      v-model="showDialogCreate"
      @input="showDialogCreate = $event"
    />
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import DetailMember from '@/components/dialogs/DetailMember'
import CreateMember from '@/components/dialogs/CreateMember'
export default {
  components: {
    DetailMember,
    CreateMember,
  },
  middleware: ['authenticated'],
  data: () => ({
    table: {
      tableHeaders: [
        {
          text: 'Member Name',
          align: 'start',
          sortable: false,
          value: 'name',
          filterable: true,
        },
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'action',
          filterable: false,
        },
      ],
      items: [
        {
          name: 'halo',
          action: 'awd',
        },
      ],
      loading: false,
    },
    optionsTable: {},
    showDialogView: false,
    member: {},
    tasks: [],
    searchItem: '',
    showDialogCreate: false,
  }),
  computed: {
    ...mapState({
      tableItems: (state) => {
        return state.member.members.map((el) => ({
          ...el,
          action: '',
        }))
      },
    }),
  },
  watch: {
    optionsTable: {
      handler() {
        this.handleGetMembers()
      },
      deep: true,
    },
  },
  mounted() {
    this.handleGetMembers()
  },
  methods: {
    ...mapActions('member', ['getAllMembers', 'getMemberById', 'searchMember']),
    ...mapMutations('member', ['SET_MEMBERS']),
    async handleGetMembers() {
      const { page, itemsPerPage } = this.optionsTable
      this.table.loading = true
      await this.getAllMembers({ limit: itemsPerPage, page, repeat: false })
      this.table.loading = false
    },
    async handleGetMemberById(id) {
      try {
        const member = await this.getMemberById({ id })
        this.showDialogView = true
        this.member = member.member.member
        this.tasks = member.member.tasks
      } catch (error) {
        console.log('error :>> ', error)
      }
    },
    setDialog(value) {
      this.showDialog = value
      this.member = {}
      this.tasks = []
    },
    async handleSearchMember() {
      if (!this.searchItem.length) return false
      try {
        const matchMembers = await this.searchMember({ name: this.searchItem })
        const members = matchMembers.searchMember
        this.SET_MEMBERS(members)
      } catch (error) {
        console.log('error :>> ', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
