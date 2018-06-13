export default function ({ store, redirect }) {
  if (!store.state.auth.isLogged) {
    return redirect('/auth#login')
  }
}