export default {
  authRules() {
    return {
      username: [
        {required: true, message: 'Please input your username', trigger: 'blur'},
        {min: 3, message: 'Length should be at lease 3', trigger: 'blur'}
      ],
      email: [
        {required: true, message: 'Please input your email', trigger: 'blur'},
        {min: 3, message: 'Length should be at lease 3', trigger: 'blur'}
      ],
      password: [
        {required: true, message: 'Please input your password', trigger: 'change'},
        {min: 3, message: 'Length should be at lease 3', trigger: 'blur'},
      ]
    }
  }
}