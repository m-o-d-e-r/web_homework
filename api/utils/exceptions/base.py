
class APIBaseException(Exception):
    _default_message = ""
    _default_status_code = 500

    def __init__(self, message: str = None, status_code: int = None, *args) -> None:
        self._status_code = (
            self.__class__._default_status_code
            if not status_code else status_code
        )

        super().__init__(
            self.__class__._default_message if not message else message,
            *args
        )

    @property
    def status_code(self) -> int:
        return self._status_code
