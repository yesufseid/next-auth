import Providers from '../componets/providers'
import SigninButton from '../componets/signinbutton'

export default function RootLayout({children}) {
  return (
    <html>
        <body>
            <Providers>
            <div>
                <SigninButton />
              {children}
            </div>
            </Providers>
        </body>
    </html>
  )
}