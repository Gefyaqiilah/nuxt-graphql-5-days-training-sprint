<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-data-table
        :headers="table.tableHeaders"
        :items="tableItems"
        :options.sync="optionsTable"
        :loading="table.loading"
        :server-items-length="4"
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
    </v-row>
    <DetailMember
      :member="member"
      :dialog="showDialog"
      :tasks="tasks"
      @dialog="showDialog = $event"
    />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DetailMember from '@/components/dialogs/DetailMember'
export default {
  components: {
    DetailMember,
  },
  data: () => ({
    table: {
      tableHeaders: [
        {
          text: 'Member Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'action',
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
    showDialog: false,
    member: {},
    tasks: [],
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
        this.showDialog = true
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
  },
}
</script>

<style lang="scss" scoped></style>
