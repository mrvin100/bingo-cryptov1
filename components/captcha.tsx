"use client"
import { useRouter } from "next/navigation";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
export default function CaptchaPage() {
  const [verified, setVerified] = React.useState(false);
  const router = useRouter();
  const handleOnChange = (value: string | null) => {
    console.log("captcha value : ", value);
    if(value){
        document.cookie = 'captcha_verified=true; path=/';
        setVerified(true);
    }
  };
  React.useEffect(() => {
    if (verified) {
      router.push("/");
    }
  }, [verified, router]);
  return (
    <div className="h-screen grid justify-center items-center">
      {!verified ? (
        <div>
          <h1 className="my-4 text-center">Veuillez vérifier que vous n&apos;êtes pas un robot</h1>
          <ReCAPTCHA
            sitekey="6Ld7kl0qAAAAAF7v4K9Eju-YJW_WNPk4F0T_BOzr"
            onChange={handleOnChange}
          />
        </div>
      ) : (
        <div>
          <h1 className="my-4 text-center">Accès autorisé !</h1>
        </div>
      )}
    </div>
  );
}
