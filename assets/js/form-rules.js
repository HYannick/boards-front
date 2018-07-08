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
  },
  bookRules() {
    return {
      title: [
        {required: true, message: 'Please enter a title!', trigger: 'blur'}
      ],
      tome_title: [
        {required: true, message: 'Please enter a tome title!', trigger: 'blur'}
      ],
      short_description: [
        {required: true, message: 'Please enter a short description', trigger: 'blur'},
        {required: true, min: 10, max: 150, message: 'Please write between 10 and 150 characters!', trigger: 'blur'}
      ],
      description: [
        {required: true, message: 'Please enter a synopsis', trigger: 'blur'},
        {required: true, min: 10, message: 'Please write more than 10 characters!', trigger: 'blur'}
      ]
    }
  }
}