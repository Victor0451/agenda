import React from "react";
import Link from "next/link";
import Image from "next/image";

const RedirectToLogin = () => {
  return (
    <div className="container d-flex justify-content-center border border-dark p-4 mt-4 mb-4 list ">
      <div className="  ">
        <h1 className="text-center">
          <strong>
            <u>
              No estas logueado, debes iniciar session para acceder al sistema
            </u>
          </strong>
        </h1>

        <div className="d-flex justify-content-center ">
          <Image
            alt="404-agenda"
            src="/img/logerr.jpg"
            className="border border-dark"
            width={800}
            height={600}

          />
        </div>

        <div className="mt-4 mb-4 d-flex justify-content-center">
          <Link href="/">
            <a className="btn btn-primary">
              Iniciar Session
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RedirectToLogin;
