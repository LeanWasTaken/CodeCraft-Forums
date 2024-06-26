<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Edit Profile"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text class="profile-info">
          <v-img
            class="profile-bg"
            height="200"
            :src="profileImage"
            cover
          >
            <v-row class="justify-space-between">
              <v-avatar class="avatar" color="surface-variant" size="120">
                <v-img
                  :src="avatarPreview || 'https://www.intentional-collective.com/wp-content/uploads/2021/03/120450684_4003220729694135_3695653168839154084_n.jpg'"
                  cover
                >
                  <v-btn
                    class="edit-pic-btn"
                    icon="mdi-image-edit-outline"
                    size="large"
                    @click="selectFile"
                  ><v-file-input
                  v-model="avatar"
                  style="background:transparent; border:none; color:transparent;"
                  accept="image/png, image/jpeg, image/gif"
                  @change="handleFileChange"
                ></v-file-input></v-btn>
                  
                </v-img>
              </v-avatar>
              <v-btn
                class="edit-bg-btn"
                icon="mdi-image-edit-outline"
                size="large"
              ></v-btn>
            </v-row>
          </v-img>

          <v-text-field v-model="name" label="Name" required></v-text-field>

          <v-text-field v-model="username" label="Username" required></v-text-field>

          <v-text-field v-model="bio" label="Bio"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="saveProfile"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const dialog = ref(false);
    const avatar = ref(null);
    const avatarPreview = ref(null);
    const name = ref('');
    const username = ref('');
    const bio = ref('');
    
    const profileImage = ref('https://i.pinimg.com/736x/57/87/39/578739480ca0069cceb40b5034dfb3c5.jpg');

    const selectFile = () => {
      // Trigger the file input dialog when the button is clicked
      avatar.value = null; // Reset the selected file (optional)
      dialog.value = true; // Open the dialog
    };

    const handleFileChange = (file) => {
      if (file) {
        avatar.value = file;
        avatarPreview.value = URL.createObjectURL(file);
      }
    };

    const saveProfile = async () => {
      if (avatar.value) {
        const formData = new FormData();
        formData.append('avatar', avatar.value);

        try {
          const userId = 'yourUserId'; // Replace this with the actual user ID
          await axios.post(`/api/upload-avatar/${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('Profile updated successfully');
        } catch (error) {
          console.error('Error uploading avatar:', error);
          alert('Failed to upload avatar');
        }
      }
      dialog.value = false;
    };

    return {
      dialog,
      avatar,
      avatarPreview,
      name,
      username,
      bio,
      profileImage,
      selectFile,
      handleFileChange,
      saveProfile
    };
  }
};
</script>

<style scoped>
.avatar {
  margin-left: 30px;
  margin-top: 45px;
  border: white 5px solid;
}

.profile-info {
  margin: 10px;
}

.profile-bg {
  color: rgb(253, 241, 241);
  align-self: self-end;
  margin-bottom: 10px;
}

.edit-pic-btn {
  margin-top: 15px;
  opacity: 50%;
  color: black;
}

.edit-bg-btn {
  margin-top: 65px;
  margin-right: 200px;
  opacity: 50%;
  color: black;
}
</style>
