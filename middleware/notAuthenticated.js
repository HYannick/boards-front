export default function ({ store, redirect }) {
  // Si l'utilisateur est authentifié, aller à la page d'accueil
  if (store.state.auth.isLogged) {
    return redirect('/')
  }
}