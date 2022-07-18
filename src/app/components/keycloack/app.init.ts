import { KeycloakService } from 'keycloak-angular';

export  function  initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
    return () =>
        keycloak.init({
            config: {
                //url:"http://10.14.14.232:8180/auth/",
                url:"http://localhost:9191/auth",
  realm:"Digital-Poste",
  clientId:"paiementDeMasse-ui",
            } ,
            initOptions : {
                onLoad:"check-sso",

            }

        })
}


