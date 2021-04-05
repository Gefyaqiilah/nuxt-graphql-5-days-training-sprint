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
          :custom-filter="filterData()"
          class="elevation-1"
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
import { mapActions, mapState } from 'vuex'
import DetailMember from '@/components/dialogs/DetailMember'
import CreateMember from '@/components/dialogs/CreateMember'
export default {
  components: {
    DetailMember,
    CreateMember,
  },
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
    searchItem: {
      handler() {
        // console.log('this.searchItem :>> ', this.searchItem);
      },
    },
    showDialogView: {
      handler() {
        this.handleGetMembers()
      }, 
    },
    showDialogCreate: {
      handler() {
        this.handleGetMembers()
      },
    },
  },
  mounted() {
    this.handleGetMembers()
  },
  methods: {
    ...mapActions('member', ['getAllMembers', 'getMemberById']),
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
        console.log('member.member :>> ', member.member)
        this.member = member.member.member
        this.tasks = member.member.tasks
        console.log('tasks :>> ', this.tasks)
      } catch (error) {
        console.log('error :>> ', error)
      }
    },
    setDialog(value) {
      this.showDialog = value
      this.member = {}
      this.tasks = []
    },
    filterData(value, search) {
      console.log('value :>> ', value)
      console.log('search :>> ', search)
      console.log('search :>> ', search)
    },
  },
}
</script>

<style lang="scss" scoped></style>
