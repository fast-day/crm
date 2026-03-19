import { Button } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

export const AuthHeader = () => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <div />

        <div className="flex items-center gap-2.5">
          <Link to={""}>
            <Button>test</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
