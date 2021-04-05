<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-container>
        <v-card class="mx-auto" hover width="900">
          <v-card-title>
            Tasks
            <v-spacer />
            <v-btn color="teal" outlined @click="showDialog = true"
              >Create Task</v-btn
            >
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="tableHeaders"
              :items="tasksItem"
              :options.sync="options"
              :server-items-length="taskPagination.totalData"
              :loading="loading"
              class="elevation-1 table-tasks"
            >
              <template #item.checkTask="{ item }">
                <v-simple-checkbox
                  v-model="item.checkTask"
                  @click="
                    handleUpdateTasks({ id: item.id, isDone: item.checkTask })
                  "
                ></v-simple-checkbox>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <CreateTask v-if="showDialog" v-model="showDialog" />
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CreateTask from '@/components/dialogs/CreateTask'

export default {
  components: {
    CreateTask,
  },
  middleware: ['authenticated'],
  data: () => ({
    tableHeaders: [
      {
        text: 'task',
        align: 'start',
        sortable: false,
        value: 'task',
      },
      {
        text: 'member',
        align: 'start',
        sortable: false,
        value: 'member',
      },
      {
        text: 'checkTask',
        align: 'start',
        sortable: false,
        value: 'checkTask',
      },
    ],
    totalData: 0,
    loading: true,
    options: {},
    showDialog: false,
  }),
  computed: mapState({
    tasksItem: (state) => {
      const mapTasks = state.task.tasks.map((el) => ({
        id: el.id,
        task: el.name,
        member: el.Member.name,
        checkTask: el.isDone,
      }))
      return mapTasks
    },
    taskPagination: (state) => state.task.pagination,
  }),
  watch: {
    options: {
      handler() {
        this.handleGetTasks()
      },
      deep: true,
    },
    showDialog: {
      handler() {
        this.handleGetTasks()
      },
      deep: true,
    },
  },
  mounted() {
    this.handleGetTasks()
  },
  methods: {
    ...mapActions('task', ['getTasks', 'updateStatusTask']),
    async handleGetTasks() {
      this.loading = true
      const { page, itemsPerPage } = this.options

      await this.getTasks({
        limit: itemsPerPage,
        page,
      })
      // set table
      this.loading = false
    },
    async handleUpdateTasks(task) {
      try {
        await this.updateStatusTask(task)
        await this.handleGetTasks()
      } catch (error) {
        console.log(`error`, error)
      }
    },
  },
}
</script>
<style></style>
