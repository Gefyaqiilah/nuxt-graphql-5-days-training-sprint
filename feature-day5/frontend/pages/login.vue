<template>
  <v-container class="d-flex justify-center">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="6" class="d-flex justify-center">
        <v-card>
          <v-card-title>
            <h2>Login</h2>
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
                  :append-icon="visibility.password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visibility.password ? 'text' : 'password'"
                  @click:append="visibility.password = !visibility.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="input.password"
                  :rules="validation.password"
                  label="Password"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ma-2" color="teal" dark @click="handleLogin()">
              Login
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
    input: {
      username: 'jhon',
      password: '123',
    },
    visibility: {
      password: false,
    },
  }),
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      if (!this.input.username || !this.input.password) {
        return false
      }
      const data = {
        username: this.input.username,
        password: this.input.password,
      }
      try {
        await this.login(data)
        this.$router.push({ path: '/' })
        alert('succeed')
      } catch (error) {
        alert('error')
      }
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
