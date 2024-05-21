<template>
  <v-card>
      <v-navigation-drawer location="left"
      expand-on-hover
      rail>
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          ></v-list-item>
          <v-list-item
            prepend-icon=""
            title="Settings"
            value="settings"
          ></v-list-item>
          <v-list-item
            prepend-icon=""
            title="Log out"
            value="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-width: 100%;">
        <slot />
      </v-main>
  </v-card>
</template>
