<template>
  <v-row justify="center">
    <v-dialog v-model="getShowDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create New Member</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="input.name"
                label="Member Name*"
                required
                clearable
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
          </v-row>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="getShowDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleCreateMember()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    input: {
      name: '',
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
  },
  methods: {
    ...mapActions('member', ['createMember']),
    async handleCreateMember() {
      if (!this.input.name) return false
      try {
        await this.createMember({ name: this.input.name })
        this.getShowDialog = false
        alert('succeed')
      } catch (error) {
        alert('error')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
