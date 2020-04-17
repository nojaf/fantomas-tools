module FantomasTools.Client.FantomasOnline.Model

open FantomasOnline.Shared

type FantomasMode =
    | Previous // Fantomas 2.x
    | Latest // Latest stable on NuGet
    | Preview // master branch

type Msg =
    | VersionReceived of string
    | OptionsReceived of FantomasOption list
    | FormatException of exn
    | NetworkError of exn
    | Format
    | FormattedReceived of string
    | UpdateOption of (string * FantomasOption)
    | ChangeMode of FantomasMode
    | SetFsiFile of bool

type EditorState =
    | LoadingOptions
    | OptionsLoaded
    | LoadingFormatRequest
    | FormatResult of string
    | FormatError of string

type Model =
    { IsFsi: bool
      Version: string
      DefaultOptions: FantomasOption list
      UserOptions: Map<string, FantomasOption>
      Mode: FantomasMode
      State: EditorState }