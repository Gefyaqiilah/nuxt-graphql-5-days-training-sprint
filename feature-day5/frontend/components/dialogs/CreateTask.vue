<template>
  <v-row justify="center">
    <v-dialog v-model="getShowDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="input.task"
                  label="Task Desc*"
                  required
                  clearable
                  prepend-icon="mdi-notebook"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-select
                  v-model="input.member"
                  :items="selectItems"
                  item-text="name"
                  item-value="id"
                  prepend-icon="mdi-account-group"
                  hide-details
                  label="Select Member*"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="getShowDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleCreateTask()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    input: {
      member: '',
      task: '',
    },
  }),
  computed: {
    getShowDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    ...mapState({
      selectItems: (state) => state.member.members,
    }),
  },
  mounted() {
    this.getAllMembers({ limit: 1, page: 1 })
  },
  methods: {
    ...mapActions('member', ['getAllMembers']),
    ...mapActions('task', ['createTask']),
    async handleCreateTask() {
      try {
        const data = {
          memberId: this.input.member,
          name: this.input.task,
        }
        await this.createTask(data)
        alert('success')
        // close dialog 
        this.getShowDialog = false
      } catch (error) {
        console.log('error :>> ', error);
        alert('failed')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
