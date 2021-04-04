<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title> User Details </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="getMember.name"
                  prepend-icon="mdi-account-circle"
                  label="Username*"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="getTasks"
                  item-text="name"
                  item-value="id"
                  prepend-icon="mdi-notebook-multiple"
                  hide-details
                  hint="Pick your favorite states"
                  persistent-hint
                  label="On Progress Task"
                />
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="auto"><h4>Completed:</h4></v-col>
                  <v-col cols="auto">{{ getCountStatus.completed }}</v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="auto"><h4>On progress:</h4></v-col>
                  <v-col cols="auto">{{ getCountStatus.onProgress }}</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="showDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    member: {
      type: Object,
      default() {
        return { name: '' }
      },
    },
    tasks: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialog', value)
      },
    },
    getMember: {
      get() {
        return this.member
      },
    },
    getTasks: {
      get() {
        return this.tasks.filter((el) => el.isDone === false)
      },
    },
    getCountStatus: {
      get() {
        const completed = this.tasks.filter((el) => el.isDone === true)
        const onProgress = this.tasks.filter((el) => el.isDone === false)
        return { completed: completed.length, onProgress: onProgress.length }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
