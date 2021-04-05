<template>
  <v-container class="d-flex justify-center">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="6" class="d-flex justify-center">
        <v-card>
          <v-card-title>
            <h2>Register</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="d-flex justify-center"> </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="input.username"
                  :rules="validation.username"
                  label="Username"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="input.password"
                  :rules="validation.password"
                  label="Password"
                  outlined
                  dense
                  :append-icon="visibility.password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visibility.password ? 'text' : 'password'"
                  @click:append="visibility.password = !visibility.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ma-2" color="teal" dark @click="handleRegister()">
              Register
              <v-icon dark right> mdi-key</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    input: {
      username: '',
      password: '',
    },
    validation: {
      password: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 Characters',
      ],
      username: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 Characters',
      ],
    },
    visibility: {
      password: false,
    },
  }),
  methods: {
    ...mapActions('master', ['createNewMaster']),
    async handleRegister() {
      if (!this.input.username || !this.input.password) return false
      try {
        const data = {
          username: this.input.username,
          password: this.input.password,
        }
        const dataMember = await this.createNewMaster(data)
        console.log('dataMember :>> ', dataMember)
        alert("Your account has been created!, Let's go login!")
        this.$router.push({ path: 'login' })
      } catch (error) {
        console.log('error.message :>> ', error.message)
        alert('error')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
